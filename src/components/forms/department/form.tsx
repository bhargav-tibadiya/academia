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
import { departmentSchema, DepartmentFormType } from '@/utils/forms/schema';
import { getDepartmentByIdThunk, updateDepartmentThunk, createDepartmentThunk, getAllInstituteThunk } from '@/store/thunks/dashboard.thunk';

// ----->> Types <<-----
interface DepartmentFormProps {
  mode: "view" | "edit";
  isOpen: boolean;
  onClose: () => void;
  selectedDepartmentId: string | null;
}

// ----->> Constants <<-----
const initialValues: DepartmentFormType = {
  id: "",
  name: "",
  institute: "",
  batch: "2020",
}

const DepartmentForm: React.FC<DepartmentFormProps> = ({ mode, isOpen, selectedDepartmentId, onClose }) => {
  // ----->> Hooks <<-----
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { selectedDepartment, institutes } = useAppSelector((state) => state.dashboard);

  // ----->> States <<-----
  const [loading, setLoading] = useState(false);

  // ----->> Form <<-----
  const departmentForm = useForm<DepartmentFormType>({
    resolver: zodResolver(departmentSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: initialValues
  });
  const { control, handleSubmit, reset } = departmentForm;

  // ----->> Functions <<-----
  const getDepartmentById = async (departmentId: string) => {
    try {
      setLoading(true);
      await dispatch(getDepartmentByIdThunk({ departmentId })).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const onSubmit = async (data: DepartmentFormType) => {
    try {
      setLoading(true);
      if (mode === 'edit' && data.id) {
        const payload = { departmentId: data.id, name: data.name, institute: data.institute, batch: data.batch }
        await dispatch(updateDepartmentThunk(payload)).unwrap();
      } else {
        const payload = { name: data.name, institute: data.institute, batch: data.batch }
        await dispatch(createDepartmentThunk(payload)).unwrap();
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

  const instituteOptions = institutes?.map((institute) => ({
    label: institute.name,
    value: institute._id,
  }));

  const batchOptions = Array.from({ length: 10 }, (_, i) => ({
    label: `202${i}`,
    value: `202${i}`,
  }));

  // ----->> Effects <<-----
  useEffect(() => {
    if (isOpen && selectedDepartmentId) {
      getDepartmentById(selectedDepartmentId);
    }
    if (institutes && institutes.length === 0) {
      dispatch(getAllInstituteThunk());
    }
  }, [isOpen, selectedDepartmentId]);

  useEffect(() => {
    if (selectedDepartment && isOpen && selectedDepartmentId) {
      departmentForm.setValue("id", selectedDepartment._id);
      departmentForm.setValue("name", selectedDepartment.name);
      departmentForm.setValue("institute", selectedDepartment.institute);
      departmentForm.setValue("batch", selectedDepartment.batch);
    }
  }, [isOpen, selectedDepartmentId, selectedDepartment]);

  return (
    <Modal
      centered
      title={selectedDepartmentId ? "Edit Department" : "Add Department"}
      open={isOpen}
      onOk={handleSubmit(onSubmit)}
      onCancel={handleClose}
      className={`${styles.dialog_content} ${styles[theme]}`}
      okText={selectedDepartmentId ? "Update" : "Add"}
    >
      <Spin spinning={loading}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.form_container}>
            {
              (selectedDepartment && selectedDepartmentId) && (<>
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
            <Controller
              control={control}
              name="institute"
              render={({ field, fieldState: { error } }) => (
                <div className={styles.form_group}>
                  <label htmlFor="institute">Institute</label>
                  <Select {...field} placeholder='Select Institute' id="institute" options={instituteOptions} disabled={mode === "view"} />
                  {error && <div className={styles.error}> <CircleAlert /> Institute is required</div>}
                </div>
              )}
            />
            <Controller
              control={control}
              name="batch"
              render={({ field, fieldState: { error } }) => (
                <div className={styles.form_group}>
                  <label htmlFor="batch">Batch</label>
                  <Select {...field} placeholder='Select Batch' id="batch" options={batchOptions} disabled={mode === "view"} />
                  {error && <div className={styles.error}> <CircleAlert /> Batch is required</div>}
                </div>
              )}
            />
          </div>
        </form>
      </Spin>
    </Modal>
  )
}

export default DepartmentForm