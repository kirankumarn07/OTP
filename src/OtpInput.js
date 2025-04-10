import React, { useEffect, useState } from 'react'

const OtpInput = ({ size = 6, onSubmit }) => {
    const [inputValues, setInputValues] = useState(() => {
        return new Array(size).fill("")
    })
    const focusNext = (curr) => {
        curr?.nextElementSibling?.focus();
    }
    const focusNexttoNext = (curr) => {
        if (curr?.nextElementSibling?.nextElementSibling) {
            curr.nextElementSibling.nextElementSibling.focus();
        } else {
            focusNext(curr)
        }
    }
    const focusPrevious = (curr) => {
        curr?.previousElementSibling?.focus()
    }
    const handleNumericInput = (event) => {
        const inputValue = Number(event.key)
        if (isNaN(inputValue)) return;
        //it checks on which event the action works on
        const inputElement = event.target;
        const inputIndex = Number(inputElement.id)
        // console.log(inputIndex);
        if (inputValues[inputIndex].length === 0) {
            setInputValues((prev) => {
                const newValues = [...prev]
                newValues[inputIndex] = inputValue.toString()
                return newValues
            })
            focusNext(inputElement);
        }
        else {
            const cursorIndex = inputElement.selectionStart;
            // console.log(cursorIndex);

            if (cursorIndex === 0) {
                setInputValues((prev) => {
                    const newValues = [...prev];
                    //already input lo value untundhi aa place vere value enter chestham appudu existing next input box loki push avuthundhi
                    if (inputIndex < size - 1) {
                        newValues[inputIndex + 1] = prev[inputIndex]
                    }
                    newValues[inputIndex] = inputValue.toString();
                    return newValues
                })
                focusNexttoNext(inputElement)
            }
            else if (inputIndex + 1 < size) {
                setInputValues((prev) => {
                    const newValues = [...prev];
                    newValues[inputIndex + 1] = inputValue;
                    return newValues
                })
                focusNexttoNext(inputElement)
            }
        }
    }
    const handleBackspace = (event) => {
        if (event.key === "Backspace") {
            const inputIndex = Number(event.target.id);
            setInputValues((prev) => {
                const newValues = [...prev];
                newValues[inputIndex] = "";
                return newValues;
            });
            focusPrevious(event.target);
        }
    };
    const handleArrow = (event) => {
        if (event.key === "ArrowRight") {
            focusNext(event.target)
        } else if (event.key === "ArrowLeft") {
            focusPrevious(event.target)
        }
    }
    const onKeyUp = (event) => {
        handleNumericInput(event)
        handleBackspace(event)
        handleArrow(event)
    }
    const handleSubmit = () => {
        const otp = inputValues.join("");
        onSubmit?.(otp);
        alert("successfully submitted....")
        setInputValues(new Array(size).fill(""));
      };
      
      const handleCancel = () => {
        setInputValues(new Array(size).fill(""));
        // Optional: Focus back on first input
        document.getElementById("0")?.focus();
      };
      
    useEffect(() => {
        var isValid = true
        inputValues.forEach((inputValue) => {
            if (inputValue.length === 0) return isValid = false
        });
        isValid && onSubmit(inputValues)
    }, [inputValues])
    return (
        <div className='container'>
            <div className='otp-inputs-container'>
                {inputValues.map((inputValue, index) => {
                    return <input key={index.toString()} value={inputValue}
                        id={index.toString()}
                        onKeyUp={onKeyUp}
                        maxLength={1}
                    />
                })
                }
            </div><br/>
            <div className="otp-buttons">
    <button onClick={handleSubmit} disabled={inputValues.includes("")}>Submit</button>
    <button onClick={handleCancel}>Cancel</button>
  </div>
        </div>
    )
}

export default OtpInput
