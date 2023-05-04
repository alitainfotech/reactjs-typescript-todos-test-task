import { useField } from "formik";
import styles from "../../styles/components/inputField.module.scss";

interface Props {
  name: string;
  type: string;
  placeholder?: string;
  label: string;
  [x: string]: any;
}

export const InputField = (props: Props) => {
  const [field, meta] = useField(props);

  return (
    <div className={styles.inputContainer}>
      <label className={styles.title}>{props.label}</label>
      <input
        className={styles.input}
        {...field}
        {...props}
        onChange={(e) => {
          const value = e.target.value;
          const name = field.name;
          field.onChange({ target: { name, value } });
        }}
      />
      {meta.touched && meta.error && (
        <span className={styles.error}>{meta.error}</span>
      )}
    </div>
  );
};
