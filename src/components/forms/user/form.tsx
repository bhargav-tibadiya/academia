// ----->> Packages <<-----
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// ----->> Store <<-----
import { useAppDispatch, useAppSelector } from '@/store/store';

// ----->> Components <<-----
import { Input, Modal, Select, Spin } from 'antd';

// ----->> Styles <<-----
import styles from '../form.module.scss';
import { CircleAlert } from '@/assets/icon/rooticon';

// ----->> Utils <<-----
import useTheme from '@/utils/hooks/useTheme';
import { UserFormType, userSchema } from '@/utils/forms/schema';
import { getUserByIdThunk, updateUserThunk } from '@/store/thunks/dashboard.thunk';

// ----->> Types <<-----
interface UserFormProps {
  mode: "view" | "edit";
  isOpen: boolean;
  onClose: () => void;
  selectedUserId: string | null;
}

// ----->> Constants <<-----
const initialValues: UserFormType = {
  id: "",
  userId: "",
  email: "",
  role: "student",
  status: "none",
}

const ROLES = [
  { label: 'Student', value: 'student' },
  { label: 'Teacher', value: 'teacher' },
  { label: 'Admin', value: 'admin' },
]

const STATUS = [
  { label: 'None', value: 'none' },
  { label: 'Applied', value: 'applied' },
  { label: 'Accepted', value: 'accepted' },
  { label: 'Rejected', value: 'rejected' },
]

const UserForm: React.FC<UserFormProps> = ({ mode, isOpen, selectedUserId, onClose }) => {
  // ----->> Hooks <<-----
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { selectedUser } = useAppSelector((state) => state.dashboard);

  // ----->> States <<-----
  const [loading, setLoading] = useState(false);

  // ----->> Form <<-----
  const userForm = useForm<UserFormType>({
    resolver: zodResolver(userSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: initialValues
  });
  const { control, handleSubmit, reset } = userForm;

  // ----->> Functions <<-----
  const getUserById = async (userId: string) => {
    try {
      setLoading(true);
      await dispatch(getUserByIdThunk(userId)).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const onSubmit = async (data: UserFormType) => {
    if (mode === 'edit' && data.id) {
      try {
        setLoading(true);
        const payload = {
          ...data,
          _id: data.id,
        }
        await dispatch(updateUserThunk(payload)).unwrap();
        onClose();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      return;
    }
  }

  const handleClose = () => {
    reset();
    onClose();
  }

  // ----->> Effects <<-----
  useEffect(() => {
    if (isOpen && selectedUserId) {
      getUserById(selectedUserId);
    }
  }, [isOpen, selectedUserId]);

  useEffect(() => {
    if (selectedUser && isOpen && selectedUserId) {
      console.log('selectedUser._id', selectedUser._id)
      userForm.setValue("id", selectedUser._id);
      userForm.setValue("userId", `${selectedUser.userId}`);
      userForm.setValue("email", selectedUser.email);
      userForm.setValue("role", selectedUser.role);
      userForm.setValue("status", selectedUser.status);
    }
  }, [isOpen, selectedUserId, selectedUser]);

  return (
    <Modal
      centered
      title={selectedUserId ? "Edit User" : "Add User"}
      open={isOpen}
      onOk={handleSubmit(onSubmit)}
      onCancel={handleClose}
      className={`${styles.dialog_content} ${styles[theme]}`}
      okText={selectedUserId ? "Update" : "Add"}
    >
      <Spin spinning={loading}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.form_container}>
            {
              selectedUser && (<>
                <Controller
                  control={control}
                  name="id"
                  render={({ field }) => (
                    <div className={styles.form_group}>
                      <label htmlFor="id">Id</label>
                      <Input {...field} id="id" disabled />
                    </div>
                  )}
                />
                <Controller
                  control={control}
                  name="userId"
                  render={({ field }) => (
                    <div className={styles.form_group}>
                      <label htmlFor="userId">User Id</label>
                      <Input {...field} value={`${selectedUser?.userId}`} id="userId" disabled />
                    </div>
                  )}
                />
              </>)
            }
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState: { error } }) => (
                <div className={styles.form_group}>
                  <label htmlFor="email">Email</label>
                  <Input {...field} id="email" disabled={mode === "view"} />
                  {error && <div className={styles.error}> <CircleAlert /> Email is required</div>}
                </div>
              )}
            />
            <Controller
              control={control}
              name="role"
              render={({ field, fieldState: { error } }) => (
                <div className={styles.form_group}>
                  <label htmlFor="role">Role</label>
                  <Select {...field} placeholder='Select Role' id="role" options={ROLES} disabled={mode === "view"} />
                  {error && <div className={styles.error}> <CircleAlert /> Role is required</div>}
                </div>
              )}
            />
            <Controller
              control={control}
              name="status"
              render={({ field, fieldState: { error } }) => (
                <div className={styles.form_group}>
                  <label htmlFor="status">Status</label>
                  <Select {...field} placeholder='Select Status' id="status" options={STATUS} disabled={mode === "view"} />
                  {error && <div className={styles.error}> <CircleAlert /> Status is required</div>}
                </div>
              )}
            />
          </div>
        </form>
      </Spin>
    </Modal>
  )
}

export default UserForm