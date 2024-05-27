const FormRow = ({
  type,
  name,
  labelText,
  defaultValue,
  placeholder,
  onChange,
}) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className='form-input'
        defaultValue={defaultValue || ''}
        placeholder={placeholder || ''} // might create problems in future
        onChange={onChange}
        required
      />
    </div>
  )
}
export default FormRow
//this is a child component
