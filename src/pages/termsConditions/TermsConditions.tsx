import React from 'react';
import "./terms.css"
const TermsConditions = () => {
    return (
        <div className="terms-conditions">
            <h1 className="section-title">Terms and Conditions</h1>
            <div className="section">
                <h2 className="subsection-title">1. Introduction</h2>
                <p>
                    Welcome to GoGo Food Delivery! These terms and conditions outline the rules and regulations for the use of our app.
                </p>
            </div>
            <div className="section">
                <h2 className="subsection-title">2. Location Tracking</h2>
                <p>
                    GoGo Food Delivery utilizes location tracking to enhance the delivery experience. By using our app, you consent to the use of your location for delivery purposes.
                </p>
            </div>
            <div className="section">
                <h2 className="subsection-title">3. Order Cancellation Policy</h2>
                <p>
                    Once an order is placed, it cannot be canceled. This policy ensures efficient handling and delivery of food orders.
                </p>
            </div>
            <div className="section">
                <h2 className="subsection-title">4. Use of Cookies</h2>
                <p>
                    We use cookies to track which food items are popular among our users. By using our app, you agree to the use of cookies in accordance with our Privacy Policy.
                </p>
            </div>
            <div className="section">
                <h2 className="subsection-title">5. Contact Us</h2>
                <p>
                    If you have any questions about these terms and conditions, please contact us at support@gogofooddelivery.com.
                </p>
            </div>
        </div>
    );
};

export default TermsConditions;
