'use client'
import { AccountForm } from '@/AccountForm'
import { AddressForm } from '@/AddressForm'
import { UserForm } from '@/UserForm'
import { FormEvent, useState } from 'react'
import { useMultiSpetForm } from './useMultiStepForm'


export default function Home() {
  type FormData = {
    firstName: string
    lastName: string
    age: string
    street: string
    city: string
    state: string
    zip: string
    email: string
    password: string
  }
  const INITTIAL_DATA:FormData  ={
    firstName: "",
    lastName: "",
    age: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    email: "",
    password: "",
  }
  const [data, setData] = useState(INITTIAL_DATA)
  function updateFields(fileds:Partial<FormData>) {
    setData(prev => {
      return {...prev,...fileds}
    })
  }
  const {
    steps,
    currentStepIndex,
    step,
    isFristStep,
    isLastStep,
    next,
    back


  } = useMultiSpetForm([
   <UserForm updateFields={updateFields} {...data} key={1}/>,
   <AddressForm updateFields={updateFields} {...data} key={2}/>,
   <AccountForm updateFields={updateFields} {...data} key={3}/>,
  ])
 function onSubmitHandler(e: FormEvent){
   e.preventDefault()
   next()
 }

  return (
   <div style={{
    position: "relative",
    background: "white",
    border: "1px solid black",
    padding: "2rem",
    margin: "1rem",
    borderRadius: "0.5rem",
    fontFamily: "Arial",
    

   }}>
     <form onSubmit={onSubmitHandler}>
       <div 
          style={{
             position: "absolute", top: ".5rem", right: ".5rem" 
       }}
       >{currentStepIndex + 1}/{steps.length}</div>
       {step}
       <div 
        style={{
            marginTop: "1rem",
            display: "flex",
            gap: ".5rem",
            justifyContent: "flex-end",
          }}>
            {!isFristStep && (
              <button type='button' onClick={back}>Back</button>
            ) }
            <button type='submit' >{isLastStep ? "Finish" : "Next"}</button>
          </div>
     </form>
   </div>
  )
}
