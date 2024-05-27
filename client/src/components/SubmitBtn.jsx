import { useNavigation } from 'react-router-dom'

const SubmitBtn = ({ formBtn }) => {
  const naviagtion = useNavigation()
  const isSubmitting = naviagtion.state === 'submitting'
  return (
    <button
      type='submit'
      className={`btn btn-block ${formBtn && 'form-btn'}`}
      disabled={isSubmitting}>
      {isSubmitting ? 'submitting' : 'submit'}
    </button>
  )
}
export default SubmitBtn
