export default function Input({
    label, 
    name,
    type,
    placeholder,
    value,
    onChange,
    condition,
    requiredError
  }) {
  
    return (
      <div className="form-outline mb-2">
        <label className="form-label" htmlFor={name}>{label}</label>
  
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}  
        />
  
        {condition  && (
          <p className="error">{requiredError}</p>
        )}
  
      </div>
    );
  
  }