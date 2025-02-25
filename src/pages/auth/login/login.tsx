/* eslint-disable @typescript-eslint/no-explicit-any */
// Packages
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../../store/store";

// Styles & Assets
import styles from './login.module.scss'
import { loginBackground } from '../../../assets/image/rootimage'
import { ChevronRight, CircleAlert } from '../../../assets/icon/rooticon'

// Utils & Constant
import useTheme from "../../../utils/hooks/useTheme";
import { ROUTES } from "../../../utils/constants/routes";
import { loginThunk } from "../../../store/thunks/auth.thunk";
import { LoginFormType, loginSchema } from '../../../utils/forms/schema';

const Login = () => {

  // Hooks
  const { theme } = useTheme();
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  // THis is form
  const loginForm = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const { control, handleSubmit } = loginForm

  // Methods
  const loginFormSubmit = async (data: LoginFormType) => {
    try {
      const payload = {
        email: data.email,
        password: data.password
      }
      const res = await dispatch(loginThunk(payload)).unwrap()
      toast.success("Login Successful")
      console.log('res', res)

    } catch (error: any) {
      const errorMessage = error?.message || error?.data?.message || 'An unexpected error occurred';
      toast.error(errorMessage)
    }
  };

  return (
    <div className={`${styles.login_container} ${styles[theme]}`}>
      <div className={styles.content}>
        <div className={styles.left}>
          <img src={loginBackground} alt="Login Background" />
          <div className={styles.welcome_text}>
            <span className={styles.title}>Welcome to</span>
            <span className={styles.sub_title}>Student Information System</span>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.form}>
            <form onSubmit={handleSubmit(loginFormSubmit)}>
              <div className={styles.part1}>
                <div className={styles.heading}>Login</div>
                <div className={styles.sub_heading}>Enter your account details</div>
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
              </div>
              <div className={styles.part3}>
                <div className={styles.heading}>Forgot Password?</div>
              </div>
              <div className={styles.part4}>
                <button type='submit' className={styles.login_button}>Login</button>
              </div>
            </form>
            <div className={styles.signup}>
              <span>Don't have an account ?</span>
              <button onClick={() => navigate(ROUTES.SIGNUP)}>Sign Up</button>
            </div>
          </div>
        </div>
      </div >
    </div >
  )
}

export default Login