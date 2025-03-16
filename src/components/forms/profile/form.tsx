// ----->> Packages <<-----
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';

// ----->> Store <<-----
import { useAppDispatch, useAppSelector } from '@/store/store';

// ----->> Components <<-----
import { Input, Modal, Select, Spin } from 'antd';

// ----->> Styles <<-----
import styles from '../form.module.scss';
import { CircleAlert } from '@/assets/icon/rooticon';

// ----->> Utils <<-----
import useTheme from '@/utils/hooks/useTheme';
import { ProfileFormType, profileSchema } from '@/utils/forms/schema';
import { createProfileThunk, updateProfileThunk, getProfileByIdThunk, getAllUsersThunk } from '@/store/thunks/dashboard.thunk';
import { GenderType } from '@/types/store/thunks/dashboard';

// ----->> Types <<-----
interface ProfileFormProps {
  mode: "view" | "edit";
  isOpen: boolean;
  onClose: () => void;
  selectedProfileId: string | null;
}

// ----->> Constants <<-----
const initialValues: ProfileFormType = {
  id: "",
  firstName: "",
  middleName: "",
  lastName: "",
  gender: "",
  birthDate: "",
  bloodGroup: "",
  address: "",
  contact: "",
  fatherName: "",
  fatherContact: "",
  motherName: "",
  motherContact: "",
}

const genderOptions = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
]

const ProfileForm: React.FC<ProfileFormProps> = ({ mode, isOpen, selectedProfileId, onClose }) => {
  // ----->> Hooks <<-----
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { profiles, selectedProfile, users } = useAppSelector((state) => state.dashboard);

  // ----->> States <<-----
  const [loading, setLoading] = useState(false);

  const userOptions = users?.map((user) => ({
    label: user.email,
    value: user._id
  }));

  // ----->> Form <<-----
  const profileForm = useForm<ProfileFormType>({
    resolver: zodResolver(profileSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: initialValues
  });
  const { control, handleSubmit, reset } = profileForm;

  // ----->> Functions <<-----
  const getProfileById = async (profileId: string) => {
    try {
      setLoading(true);
      await dispatch(getProfileByIdThunk({ profileId })).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const onSubmit = async (data: ProfileFormType) => {
    try {
      setLoading(true);
      if (mode === 'edit' && data.id) {
        const payload = {
          profileId: data.id,
          userId: data.userId,
          firstName: data.firstName,
          middleName: data.middleName,
          lastName: data.lastName,
          gender: data.gender as GenderType,
          birthDate: dayjs(data.birthDate, "DD-MM-YYYY").toISOString(),
          bloodGroup: data.bloodGroup,
          address: data.address,
          contact: data.contact,
          fatherName: data.fatherName,
          fatherContact: data.fatherContact,
          motherName: data.motherName,
          motherContact: data.motherContact
        }
        await dispatch(updateProfileThunk(payload)).unwrap();
      } else {
        const payload = {
          userId: data.userId,
          firstName: data.firstName,
          middleName: data.middleName,
          lastName: data.lastName,
          gender: data.gender as GenderType,
          birthDate: dayjs(data.birthDate, "DD-MM-YYYY").toISOString(),
          bloodGroup: data.bloodGroup,
          address: data.address,
          contact: data.contact,
          fatherName: data.fatherName,
          fatherContact: data.fatherContact,
          motherName: data.motherName,
          motherContact: data.motherContact
        }
        await dispatch(createProfileThunk(payload)).unwrap();
      }
      handleClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleClose = () => {
    reset();
    onClose();
  }

  // ----->> Effects <<-----
  useEffect(() => {
    if (isOpen && selectedProfileId) {
      getProfileById(selectedProfileId);
    }
    if (profiles && profiles.length === 0) {
      dispatch(getAllUsersThunk());
    }
  }, [isOpen, selectedProfileId]);

  useEffect(() => {
    if (selectedProfile && isOpen && selectedProfileId) {
      profileForm.setValue("id", selectedProfile._id);
      profileForm.setValue("firstName", selectedProfile.firstName);
      profileForm.setValue("middleName", selectedProfile.middleName);
      profileForm.setValue("lastName", selectedProfile.lastName);
      profileForm.setValue("gender", selectedProfile.gender);
      profileForm.setValue("birthDate", dayjs(selectedProfile.birthDate).format("DD-MM-YYYY"));
      profileForm.setValue("bloodGroup", selectedProfile.bloodGroup);
      profileForm.setValue("address", selectedProfile.address);
      profileForm.setValue("contact", selectedProfile.contact);
      profileForm.setValue("fatherName", selectedProfile.fatherName);
      profileForm.setValue("fatherContact", selectedProfile.fatherContact);
      profileForm.setValue("motherName", selectedProfile.motherName);
      profileForm.setValue("motherContact", selectedProfile.motherContact);
    }
  }, [isOpen, selectedProfileId, selectedProfile]);

  return (
    <Modal
      centered
      title={selectedProfileId ? "Edit Profile" : "Add Profile"}
      open={isOpen}
      onOk={handleSubmit(onSubmit)}
      onCancel={handleClose}
      className={`${styles.dialog_content} ${styles[theme]}`}
      okText={selectedProfileId ? "Update" : "Add"}
    >
      <Spin spinning={loading}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.form_container}>
            {
              (selectedProfile && selectedProfileId) && (<>
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
              </>)
            }
            {
              (!selectedProfileId) && (<>
                <Controller
                  control={control}
                  name="userId"
                  render={({ field, fieldState: { error } }) => (
                    <div className={styles.form_group}>
                      <label htmlFor="userId">User</label>
                      <Select {...field} showSearch placeholder='Select User' id="userId" options={userOptions} disabled={mode === "view"} />
                      {error && <div className={styles.error}> <CircleAlert /> User is required</div>}
                    </div>
                  )}
                />
              </>)
            }
            <Controller
              control={control}
              name="firstName"
              render={({ field, fieldState: { error } }) => (
                <div className={styles.form_group}>
                  <label htmlFor="firstName">First Name</label>
                  <Input {...field} id="firstName" disabled={mode === "view"} />
                  {error && <div className={styles.error}> <CircleAlert /> First Name is required</div>}
                </div>
              )}
            />
            <Controller
              control={control}
              name="middleName"
              render={({ field, fieldState: { error } }) => (
                <div className={styles.form_group}>
                  <label htmlFor="middleName">Middle Name</label>
                  <Input {...field} id="middleName" disabled={mode === "view"} />
                  {error && <div className={styles.error}> <CircleAlert /> Middle Name is required</div>}
                </div>
              )}
            />
            <Controller
              control={control}
              name="lastName"
              render={({ field, fieldState: { error } }) => (
                <div className={styles.form_group}>
                  <label htmlFor="lastName">Last Name</label>
                  <Input {...field} id="lastName" disabled={mode === "view"} />
                  {error && <div className={styles.error}> <CircleAlert /> Last Name is required</div>}
                </div>
              )}
            />
            <Controller
              control={control}
              name="gender"
              render={({ field, fieldState: { error } }) => (
                <div className={styles.form_group}>
                  <label htmlFor="gender">Gender</label>
                  <Select {...field} placeholder='Select Gender' id="gender" options={genderOptions} disabled={mode === "view"} />
                  {error && <div className={styles.error}> <CircleAlert /> Gender is required</div>}
                </div>
              )}
            />
            <Controller
              control={control}
              name="birthDate"
              render={({ field, fieldState: { error } }) => (
                <div className={styles.form_group}>
                  <label htmlFor="birthDate">Birth Date</label>
                  <Input {...field} id="birthDate" disabled={mode === "view"} />
                  {error && <div className={styles.error}> <CircleAlert /> Birth Date is required</div>}
                </div>
              )}
            />
            <Controller
              control={control}
              name="bloodGroup"
              render={({ field, fieldState: { error } }) => (
                <div className={styles.form_group}>
                  <label htmlFor="bloodGroup">Blood Group</label>
                  <Input {...field} id="bloodGroup" disabled={mode === "view"} />
                  {error && <div className={styles.error}> <CircleAlert /> Blood Group is required</div>}
                </div>
              )}
            />
            <Controller
              control={control}
              name="address"
              render={({ field, fieldState: { error } }) => (
                <div className={styles.form_group}>
                  <label htmlFor="address">Address</label>
                  <Input {...field} id="address" disabled={mode === "view"} />
                  {error && <div className={styles.error}> <CircleAlert /> Address is required</div>}
                </div>
              )}
            />
            <Controller
              control={control}
              name="contact"
              render={({ field, fieldState: { error } }) => (
                <div className={styles.form_group}>
                  <label htmlFor="contact">Contact</label>
                  <Input {...field} id="contact" disabled={mode === "view"} />
                  {error && <div className={styles.error}> <CircleAlert /> Contact is required</div>}
                </div>
              )}
            />
            <Controller
              control={control}
              name="fatherName"
              render={({ field, fieldState: { error } }) => (
                <div className={styles.form_group}>
                  <label htmlFor="fatherName">Father Name</label>
                  <Input {...field} id="fatherName" disabled={mode === "view"} />
                  {error && <div className={styles.error}> <CircleAlert /> Father Name is required</div>}
                </div>
              )}
            />
            <Controller
              control={control}
              name="fatherContact"
              render={({ field, fieldState: { error } }) => (
                <div className={styles.form_group}>
                  <label htmlFor="fatherContact">Father Contact</label>
                  <Input {...field} id="fatherContact" disabled={mode === "view"} />
                  {error && <div className={styles.error}> <CircleAlert /> Father Contact is required</div>}
                </div>
              )}
            />
            <Controller
              control={control}
              name="motherName"
              render={({ field, fieldState: { error } }) => (
                <div className={styles.form_group}>
                  <label htmlFor="motherName">Mother Name</label>
                  <Input {...field} id="motherName" disabled={mode === "view"} />
                  {error && <div className={styles.error}> <CircleAlert /> Mother Name is required</div>}
                </div>
              )}
            />
            <Controller
              control={control}
              name="motherContact"
              render={({ field, fieldState: { error } }) => (
                <div className={styles.form_group}>
                  <label htmlFor="motherContact">Mother Contact</label>
                  <Input {...field} id="motherContact" disabled={mode === "view"} />
                  {error && <div className={styles.error}> <CircleAlert /> Mother Contact is required</div>}
                </div>
              )}
            />
          </div>
        </form>
      </Spin>
    </Modal>
  )
}

export default ProfileForm