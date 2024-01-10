import React from 'react'

const About = () => {
    return (
        <div className="container mt-5">
        <h1 className="display-3 font-weight-bold text-center mb-5"><b>About Us</b></h1>
        <div className="row justify-content-center">
            <div className="col-md-8">
                <p className="lead text-center">
                    <strong>We are here to help you!</strong>
                </p>
                <div className="card border-primary mb-3">
                    <div className="card-body">
                        <p className="card-text">
                            We are here to help you generate payment slips for your company.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default About
