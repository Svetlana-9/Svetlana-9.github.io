import './Navigation.css';
import Section from './Section.tsx'

interface IPropsNavigation {
  setSection: React.Dispatch<React.SetStateAction<string>>,
}

export default function Navigation(props: IPropsNavigation) {
  return (
    <div className='navigation'>
      <Section onClick={() => props.setSection('allCats')} name={'Все котики'} />
      <Section onClick={() => props.setSection('favouriteCats')} name={'Любимые котики'} />
    </div>
  )
}