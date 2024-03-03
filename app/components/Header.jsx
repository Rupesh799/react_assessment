
import React from 'react'
import Link from 'next/link'
const Header = () => {
    const Menu=[
        {
            id:1,
            name:'Product',
            path:'/product'
        },
        {
            id:2,
            name:'Categories',
            path:'/categories'
        }, {
            id:3,
            name:'Login',
            path:'/Login'
        },{
            id:4,
            name:'Chart',
            path:'/chart'
        },
    ]
  return (
    <>
    <div className= 'w-full bg-black px-9 py-5'>
       <ul className='flex justify-center align-center text-white'>
        {Menu.map((item, index)=>(
         <li key={index} className='px-5' ><Link href={`${item.path}`}>{item.name}</Link></li>
        
        ))}
       </ul>

    </div>

            
    </>
  )
}

export default Header