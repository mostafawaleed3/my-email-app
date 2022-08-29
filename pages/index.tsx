import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';
import { validate } from '../utils/validate';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import { FormType } from '../types';

interface IErrors extends Partial<FormType> {}

export default function Home() {
  const form = useRef();

  const [values, setValues] = useState<FormType>({
    name: '',
    age: '',
    details: '',
    phone: '',
    email: ''
  });
  const [errors, setErrors] = useState<IErrors>({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errors = validate(values);
    if (errors && Object.keys(errors).length > 0) {
      return setErrors(errors);
    }
    setErrors({});
    setLoading(true);

    emailjs
      .sendForm(
        process.env.EMAILJS_SERVICE_ID,
        process.env.EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setValues({
          name: '',
          age: '',
          details: '',
          phone: '',
          email: ''
        });
      });

    setLoading(false);
  }

  function handleChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setValues((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value
    }));
  }

  return (
    <form className="flow" ref={form} name="" onSubmit={handleSubmit}>
      <div className="grid-template" data-col="50-50">
        <div>
          <Input
            value={values.name}
            type="text"
            id="name"
            onChange={handleChange}
            error={!!errors.name}
            errorMessage={errors.name ? errors.name : ''}
          />
        </div>
        <div>
          <Input
            value={values.email}
            type="email"
            id="email"
            onChange={handleChange}
            error={!!errors.email}
            errorMessage={errors.email ? errors.email : ''}
          />
        </div>
      </div>
      <div className="grid-template" data-col="50-50">
        <div>
          <Input
            value={values.age}
            type="text"
            id="age"
            onChange={handleChange}
            error={!!errors.age}
            errorMessage={errors.age ? errors.age : ''}
          />
        </div>
        <div>
          <Input
            value={values.phone}
            type="text"
            id="phone"
            onChange={handleChange}
            error={!!errors.phone}
            errorMessage={errors.phone ? errors.phone : ''}
          />
        </div>
      </div>
      <div>
        <TextArea
          value={values.details}
          id="details"
          label="add any details or information"
          onChange={handleChange}
          error={!!errors.details}
          errorMessage={errors.details ? errors.details : ''}
        ></TextArea>
      </div>
      <div>
        <button className="button" disabled={loading}>
          send
        </button>
      </div>
    </form>
  );
}
