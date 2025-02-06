"use client"
import React, { useMemo, useState } from 'react'
import Modal from './Modal'
import useRentModal from '@/app/hooks/useRentModal'
import Heading from '../Heading'
import { categories } from '../navbar/Categories'
import CategoryInput from '../inputs/CategoryInput'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import CountrySelect from '../inputs/CountrySelect'
import dynamic from 'next/dynamic'
import Counter from '../inputs/Counter'
import ImageUpload from '../inputs/ImageUpload'
import Input from '../inputs/Input'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5
}

const RentModal = () => {
  const rentModal = useRentModal()
  const [step, setStep] = useState(STEPS.CATEGORY)
  const [isLoading, setisLoading] = useState(false)
  const router=useRouter()
  const onNext = () => {
   
    if (step < STEPS.PRICE) {
      setStep((value) => {
        const newStep = Math.min(value + 1, STEPS.PRICE);
        
        return newStep;
      });
    }
  };

  const onBack = () => {

    if (step > 0) {
      setStep((value) => {
        const newStep = Math.max(value - 1, 0);
     
        return newStep;
      });
    }
  };
  const onSubmit:SubmitHandler<FieldValues>=(data)=>{
    if(step!== STEPS.PRICE){
      return onNext()
    }
    setisLoading(true)
    axios.post('/api/listings',data).then(()=>{
      toast.success('Listing Created')
      router.refresh()
      reset()
      setStep(STEPS.CATEGORY)
      rentModal.onClose()
    }).catch(()=>{
      toast.error('Something went wrong')
    }).finally(()=>{
      setisLoading(false)
    })
  }

  const { register, watch, setValue, handleSubmit, formState: { errors },reset } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    }
  });

  const category = watch('category')
  const location = watch('location')
  const guestCount = watch('guestCount')
  const roomCount = watch('roomCount')
  const bathroomCount = watch('bathroomCount')
  const imageSrc = watch('imageSrc')
  const Map = useMemo(
    () => dynamic(() => import("../Map"), {
      ssr: false,

    }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create'
    }
    return 'Next'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined
    }
    return 'Back'
  }, [step])

  let bodyContent = (
    <div className='flex flex-col gap-8'>
      <Heading title='Which of these best describe your place?' subtitle='Pick a category' />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
        {categories.map((item) => (
          <div className='col-span-1' key={item.label}>
            <CategoryInput onClick={(category) => setCustomValue('category', category)} selected={category === item.label} label={item.label} icon={item.icon} />
          </div>
        ))}
      </div>
    </div>
  )

  if (step === STEPS.LOCATION) {

    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading title='Where is your place located?' subtitle='Help guest find you' />
        <CountrySelect onChange={(value) => setCustomValue('location', value)} value={location} />
        <Map center={location?.latlng} />
      </div>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading title='Share Some basics about your place' subtitle='What amenities do you have?' />
        <Counter title='Number of guests' value={guestCount} subtitle='How many guests do you have?' onChange={(value) => setCustomValue('guestCount', value)} />
        <Counter title='Number of Rooms' value={roomCount} subtitle='How many rooms do you have?' onChange={(value) => setCustomValue('roomCount', value)} />
        <Counter title='Number of Bathrooms' value={bathroomCount} subtitle='How many bathrooms do you have?' onChange={(value) => setCustomValue('bathroomCount', value)} />
      </div>
    )
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading title='Add a photo of your place' subtitle='Show guests what your place looks like' />
        <ImageUpload onChange={(value) => setCustomValue('imageSrc', value)} value={imageSrc} />
      </div>
    )
  }
  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading title='How would you describe your place' subtitle='Short and sweet words best!' />
        <Input id='title' label='Title' disabled={isLoading} register={register} errors={errors} required />
        <Input id='description' label='Description' disabled={isLoading} register={register} errors={errors} required />
        <hr />
      </div>
    )
  }
if(step===STEPS.PRICE){
  bodyContent=(
    <div className='flex flex-col gap-8'>
        <Heading title='Now set your price!' subtitle='How much do you charge per night?' />
        <Input id='price' label='Price' disabled={isLoading} register={register} errors={errors} required formatPrice type='number'/>
        <hr />
      </div>
  )
  
}
  return (
    <Modal
      title='Wander your home'
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={onBack}
      body={bodyContent}
    />
  )
}

export default RentModal