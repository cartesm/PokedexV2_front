import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { PiEyeBold, PiEyeSlashBold } from 'react-icons/pi'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth.context'
function Register() {

  const { registerUser, isLoged, authErrors } = useAuth()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [isVisible, setIsVisible] = useState(false)

  const changeVisivility = () => isVisible ? setIsVisible(false) : setIsVisible(true)
  const navigate = useNavigate()

  if (isLoged) return navigate("/")

  return (
    <main className='main-content bg-[#103a55] max-w-5xl mx-auto'>
      <section className='max-w-md mx-auto flex items-center justify-center h-screen'>
        <div className='bg-sky-950 p-5 rounded-md'>
          <h1 className='text-3xl text-white font-bold my-3'>Register</h1>
          <form action='' onSubmit={handleSubmit(async (e) => {
            await registerUser(e)
          })}>
            <div>
              <label className='label-input'>Nombre de usuario</label>
              <input placeholder='ejemplo usuario' type="text" className='input' {...register("userName", {
                required: true
              })} />
              {errors.userName?.type == "required" && <span className='text-red-500 block'>Este campo es requerido</span>}
            </div>
            <div>
              <label className='label-input'>Email</label>
              <input placeholder='ejemplo@gmail.com' type="text" className='input' {...register("email", {
                required: true,
                pattern: /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
              })} />
              {errors.email?.type == "required" && <span className='text-red-500 block'>Este campo es requerido</span>}
              {errors.email?.type == "pattern" && <span className='text-red-500 block'>Ingrese un email valido</span>}
            </div>
            <div>
              <label className='label-input'>Contraseña</label>
              <div className='input flex items-center justify-between'>
                <input placeholder='ejemplo123' className='outline-none w-full bg-transparent' type={isVisible ? "text" : "password"}  {...register("password", {
                  required: true,
                })} />
                {isVisible ? <PiEyeSlashBold onClick={changeVisivility} className='text-white text-xl hover:cursor-pointer' />
                  : <PiEyeBold onClick={changeVisivility} className='text-white text-xl hover:cursor-pointer' />}
              </div>
              {errors.password?.type == "required" && <span className='text-red-500 block'>Este campo es requerido</span>}
            </div>
            {authErrors.map((err, index) => <div key={index} className='text-red-500'>{err}</div>)}
            <input className='bg-sky-600 rounded-md text-white py-1 px-3' type="submit" value="Enviar" />
          </form>
          <p className='text-white flex gap-2 mt-2'>
            <span>¿Tienes una cuenta?</span>
            <Link to={"/login"}
              className='text-sky-500'>Inicia sesion</Link>
          </p>
        </div>
      </section>
    </main>
  )
}

export default Register