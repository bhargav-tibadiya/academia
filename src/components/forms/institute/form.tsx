// ----->> Packages <<-----
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// ----->> Store <<-----
import { useAppDispatch, useAppSelector } from '@/store/store';

// ----->> Components <<-----
import { Input, Modal, Spin } from 'antd';

// ----->> Styles <<-----
import styles from '../form.module.scss';
import { CircleAlert } from '@/assets/icon/rooticon';

// ----->> Utils <<-----
import useTheme from '@/utils/hooks/useTheme';
import { InstituteFormType, instituteSchema } from '@/utils/forms/schema';
import { getInstituteByIdThunk, updateInstituteThunk, createInstituteThunk } from '@/store/thunks/dashboard.thunk';

// ----->> Types <<-----
interface InstituteFormProps {
  mode: "view" | "edit";
  isOpen: boolean;
  onClose: () => void;
  selectedInstituteId: string | null;
}

// ----->> Constants <<-----
const initialValues: InstituteFormType = {
  id: "",
  name: "",
}

const InstituteForm: React.FC<InstituteFormProps> = ({ mode, isOpen, selectedInstituteId, onClose }) => {
  // ----->> Hooks <<-----
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { selectedInstitute } = useAppSelector((state) => state.dashboard);

  // ----->> States <<-----
  const [loading, setLoading] = useState(false);

  // ----->> Form <<-----
  const instituteForm = useForm<InstituteFormType>({
    resolver: zodResolver(instituteSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: initialValues
  });
  const { control, handleSubmit, reset } = instituteForm;

  // ----->> Functions <<-----
  const getInstituteById = async (instituteId: string) => {
    try {
      setLoading(true);
      await dispatch(getInstituteByIdThunk({ instituteId })).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const onSubmit = async (data: InstituteFormType) => {
    try {
      setLoading(true);
      if (mode === 'edit' && data.id) {
        const payload = { instituteId: data.id, name: data.name }
        await dispatch(updateInstituteThunk(payload)).unwrap();
      } else {
        const payload = { name: data.name }
        await dispatch(createInstituteThunk(payload)).unwrap();
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
    if (isOpen && selectedInstituteId) {
      getInstituteById(selectedInstituteId);
    }
  }, [isOpen, selectedInstituteId]);

  useEffect(() => {
    if (selectedInstitute && isOpen && selectedInstituteId) {
      console.log('selectedInstitute._id', selectedInstitute._id)
      instituteForm.setValue("id", selectedInstitute._id);
      instituteForm.setValue("name", selectedInstitute.name);
    }
  }, [isOpen, selectedInstituteId, selectedInstitute]);

  return (
    <Modal
      centered
      title={selectedInstituteId ? "Edit Institute" : "Add Institute"}
      open={isOpen}
      onOk={handleSubmit(onSubmit)}
      onCancel={handleClose}
      className={`${styles.dialog_content} ${styles[theme]}`}
      okText={selectedInstituteId ? "Update" : "Add"}
    >
      <Spin spinning={loading}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.form_container}>
            {
              (selectedInstitute && selectedInstituteId) && (<>
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
            <Controller
              control={control}
              name="name"
              render={({ field, fieldState: { error } }) => (
                <div className={styles.form_group}>
                  <label htmlFor="name">Name</label>
                  <Input {...field} id="name" disabled={mode === "view"} />
                  {error && <div className={styles.error}> <CircleAlert /> Name is required</div>}
                </div>
              )}
            />
          </div>
        </form>
      </Spin>
    </Modal>
  )
}

export default InstituteForm