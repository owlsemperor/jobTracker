import styled from 'styled-components'
import Wrapper from '../assets/wrappers/LandingPage'
import main from '../assets/images/main.svg'

import { Link } from 'react-router-dom'
import { Logo } from '../components'

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            job <span>tracking</span> App
          </h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam
            doloribus rem vitae quisquam magnam, nemo minima consequatur
            asperiores quo at pariatur obcaecati saepe corporis tenetur
            exercitationem ab qui libero sed.
          </p>
          <Link to='/register' className='btn register-link'>
            Register
          </Link>
          <Link to='/login' className='btn register-link'>
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt='job hunt image' className='img main-img' />
      </div>
    </Wrapper>
  )
}

export default Landing
