/* eslint-disable @typescript-eslint/no-explicit-any */
// Packages
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch } from "../../../store/store";
import { zodResolver } from "@hookform/resolvers/zod";

// Styles & Assets
import styles from './signup.module.scss'
import { ChevronRight, CircleAlert } from '../../../assets/icon/rooticon'

// Utils & Constant
import { ROUTES } from "../../../utils/constants/routes";
import { SignupFormType, signupSchema } from "../../../utils/forms/schema";
import { sendOTPThunk, signupThunk } from "../../../store/thunks/auth.thunk";
import { loginBackground as signupBackground } from "../../../assets/image/rootimage";

const Signup = () => {

  // Hooks
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  // State
  const [role, setRole] = useState("student")

  const signupForm = useForm<SignupFormType>({
    resolver: zodResolver(signupSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      otp: "",
      role: "student",
    }
  });

  const { control, handleSubmit, getValues, setValue, watch } = signupForm

  // Methods
  const sendEmail = async (email: string) => {
    const sendOTP = dispatch(sendOTPThunk({ email })).unwrap();

    toast.promise(sendOTP, {
      loading: "Sending OTP...",
      success: (res) => res.message,
      error: "Failed to send OTP. Please try again.",
    });

    try {
      const res = await sendOTP;
      if (!res.success) {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  const signupFormSubmit = async (data: SignupFormType) => {
    try {
      const payload = {
        email: data.email,
        password: data.password,
        otp: data.otp,
        role: data.role,
      }
      await dispatch(signupThunk(payload)).unwrap()
    } catch (error: any) {
      const errorMessage = error?.message || error?.data?.message || 'An unexpected error occurred';
      toast.error(errorMessage)
    }
  };

  useEffect(() => {
    setRole(watch('role'))
  }, [watch('role')])

  return (
    <div className={styles.signup_container}>
      <div className={styles.content}>
        <div className={styles.left}>
          <img src={signupBackground} alt="Signup Background" />
          <div className={styles.welcome_text}>
            <span className={styles.title}>Welcome to</span>
            <span className={styles.sub_title}>Student Information System</span>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.form}>
            <form onSubmit={handleSubmit(signupFormSubmit)}>
              <div className={styles.part1}>
                <div className={styles.heading}>Signup</div>
                <div className={styles.sub_heading}>Enter your account details</div>
              </div>
              <div className={styles.part5}>
                <div onClick={() => { setValue('role', "student") }} className={`${styles.item} ${role === 'student' ? styles.selected : ""}`}>Student</div>
                <div onClick={() => { setValue('role', "teacher") }} className={`${styles.item} ${role === 'teacher' ? styles.selected : ""}`}>Teacher</div>
              </div>
              <div className={styles.part2}>
                <div className={styles.input_email}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field, fieldState: { error } }) => {
                      return (
                        <>
                          <input {...field} placeholder="Enter email" />
                          <div className={styles.marker}><ChevronRight /></div>
                          <div className={styles.formik_error}>{error && (<><CircleAlert /><span>{error.message}</span></>)}
                          </div>
                        </>
                      );
                    }}
                  />
                </div>
                <div className={styles.input_password}>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field, fieldState: { error } }) => {
                      return (
                        <>
                          <input type="password" {...field} placeholder="Enter password" />
                          <div className={styles.marker}><ChevronRight /></div>
                          <div className={styles.formik_error}>{error && (<><CircleAlert /><span>{error.message}</span></>)}
                          </div>
                        </>
                      );
                    }}
                  />
                </div>
                <div className={styles.input_otp}>
                  <Controller
                    name="otp"
                    control={control}
                    render={({ field, fieldState: { error } }) => {
                      return (
                        <>
                          <input type="text" maxLength={8} {...field} placeholder="Enter otp" />
                          <div className={styles.marker}><ChevronRight /></div>
                          <div className={styles.formik_error}>{error && (<><CircleAlert /><span>{error.message}</span></>)}
                          </div>
                        </>
                      );
                    }}
                  />
                </div>
              </div>
              <div className={styles.part3}>
                <div className={styles.heading}>Forgot Password?</div>

                <div onClick={() => { sendEmail(getValues('email')) }} className={styles.send_otp}>Send Otp</div>
              </div>
              <div className={styles.part4}>
                <button type='submit' className={styles.signup_button}>Signup</button>
              </div>
            </form>
            <div className={styles.signup}>
              <span>Already have an account ?</span>
              <button onClick={() => navigate(ROUTES.LOGIN)}>Log In</button>
            </div>
          </div>
        </div>
      </div >
    </div >
  )
}

export default Signup