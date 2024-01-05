export default ({ value, setValue, placeholder, required, clearable }: { value: string, setValue: Function, placeholder: string, required: boolean, clearable: boolean }) => {
  function clear() {
    setValue('')
    document.querySelector('input')?.focus()
  }

  return (
    <div className="p-relative">
      <input type="text" placeholder={placeholder} required={required} value={value} onChange={(e) => setValue(e.target.value)} autoFocus />
      { !clearable ? '' :
        <button className="clearable" onClick={clear} type="button">✕</button>
      }
    </div>
  )
}
