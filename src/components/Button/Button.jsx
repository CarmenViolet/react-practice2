

export const Button = ({text, handlerClick}) => {
    return (
        <>
        <button onClick={handlerClick} type="button">{text}</button>
        </>
    )
}