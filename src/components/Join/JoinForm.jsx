import React from 'react'
import './JoinForm.css'

const JoinForm = ({join}) => {

    const onJoin = (e) => {
        // json 방식으로 날리는거임

        e.preventDefault(); // submit 기본 동작 방지

        const form = e.target

        const username = form.username.value.trim();
        const password = form.password.value.trim();
        const name = form.name.value.trim();
        const email = form.email.value.trim();

        console.log(username, password, name, email);

        join( {username, password, name, email} );
    }

    return (
        <div className="form">
            <h2 className="join-title">Join</h2>

            <form className='join-form' onSubmit={(e) => onJoin(e)}>
                <div>
                    <label htmlFor='username'>username</label>

                    <input type="text"
                        id='username'
                        placeholder='username'
                        name='username'
                        autoComplete='username'
                        required
                    / >
                </div>

                <div>
                    <label htmlFor='password'>password</label>

                    <input type="password"
                        id='password'
                        placeholder='password'
                        name='password'
                        autoComplete='password'
                        required
                    / >
                </div>

                <div>
                    <label htmlFor='name'>name</label>

                    <input type="text"
                        id='name'
                        placeholder='name'
                        name='name'
                        autoComplete='name'
                        required
                    / >
                </div>

                <div>
                    <label htmlFor='email'>email</label>

                    <input type="email"
                        id='email'
                        placeholder='email'
                        name='email'
                        autoComplete='email'
                        required
                    / >
                </div>

                <button className='btn btn--form btn-join'>Join</button>
            </form>
        </div>
    )
}

export default JoinForm