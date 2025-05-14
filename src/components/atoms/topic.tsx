import React from 'react'

// a component that has orange title, main title, description text and an action button
// widely used in the home screen

const Topic: React.FC<{
    orangeTitle?: string;
    title?: string;
    text?: string;
    action?: any
}> = ({ orangeTitle, title, text, action }) => {
    return (

        <div>
            {/* Orange title at the top */}
            <p className='text-orange-400'>{orangeTitle}</p>
            {/* Main title in bold font */}
            <p className='text-2xl font-bold'>{title}</p>
            {/* Detail text in light font*/}
            <p className='font-light'>{text}</p>
            {/* place any button or text at the button */}
            {action}
        </div>
    )
}

export default Topic