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
import { classSchema, ClassFormType } from '@/utils/forms/schema';
import { createClassThunk, updateClassThunk, getAllDepartmentThunk, getClassByIdThunk } from '@/store/thunks/dashboard.thunk';

// ----->> Types <<-----
interface ClassFormProps {
  mode: "view" | "edit";
  isOpen: boolean;
  onClose: () => void;
  selectedClassId: string | null;
}

// ----->> Constants <<-----
const initialValues: ClassFormType = {
  id: "",
  name: "",
  department: "",
}

const ClassForm: React.FC<ClassFormProps> = ({ mode, isOpen, selectedClassId, onClose }) => {
  // ----->> Hooks <<-----
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { departments, selectedClass } = useAppSelector((state) => state.dashboard);

  // ----->> States <<-----
  const [loading, setLoading] = useState(false);

  // ----->> Form <<-----
  const classForm = useForm<ClassFormType>({
    resolver: zodResolver(classSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: initialValues
  });
  const { control, handleSubmit, reset } = classForm;

  // ----->> Functions <<-----
  const getClassById = async (classId: string) => {
    try {
      setLoading(true);
      await dispatch(getClassByIdThunk({ classId })).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const onSubmit = async (data: ClassFormType) => {
    try {
      setLoading(true);
      if (mode === 'edit' && data.id) {
        const payload = { classId: data.id, name: data.name, department: data.department }
        await dispatch(updateClassThunk(payload)).unwrap();
      } else {
        const payload = { name: data.name, department: data.department }
        await dispatch(createClassThunk(payload)).unwrap();
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

  const departmentOptions = departments?.map((department) => ({
    label: department.name,
    value: department._id,
  }));

  // ----->> Effects <<-----
  useEffect(() => {
    if (isOpen && selectedClassId) {
      getClassById(selectedClassId);
    }
    if (departments && departments.length === 0) {
      dispatch(getAllDepartmentThunk());
    }
  }, [isOpen, selectedClassId]);

  useEffect(() => {
    if (selectedClass && isOpen && selectedClassId) {
      classForm.setValue("id", selectedClass._id);
      classForm.setValue("name", selectedClass.name);
      classForm.setValue("department", selectedClass.department);
    }
  }, [isOpen, selectedClassId, selectedClass]);

  return (
    <Modal
      centered
      title={selectedClassId ? "Edit Class" : "Add Class"}
      open={isOpen}
      onOk={handleSubmit(onSubmit)}
      onCancel={handleClose}
      className={`${styles.dialog_content} ${styles[theme]}`}
      okText={selectedClassId ? "Update" : "Add"}
    >
      <Spin spinning={loading}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.form_container}>
            {
              (selectedClass && selectedClassId) && (<>
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
              name="department"
              render={({ field, fieldState: { error } }) => (
                <div className={styles.form_group}>
                  <label htmlFor="department">Department</label>
                  <Select {...field} placeholder='Select Department' id="department" options={departmentOptions} disabled={mode === "view"} />
                  {error && <div className={styles.error}> <CircleAlert /> Department is required</div>}
                </div>
              )}
            />
          </div>
        </form>
      </Spin>
    </Modal>
  )
}

export default ClassForm