Requriments and Features =>

Functional Requirements

● Add to Cart: The system has a cart, the add to cart will allow the user to add the desired products into the cart, when the wish list completes the user will go to the cart and buy products.

● Payment Method: The system should have a payment method, this allows the user to choose between a
different number of payment options. Any payment potion has required data, there must be fields to take
these data from the user. When purchasing products according to the selected payment option, a
generated receipt will appear on the screen, this receipt will be sent via email and SMS to the user’s phone number.

● Supported Payment Methods: There are two payment options/methods (Credit card – cash on delivery).

● Feedback: Further features include a feedback option and a complain box. In case of any mishap, the user can submit a complaint that will be sent to the seller’s email.

● CRUD Operations: The System should have a feature on the admin site to create/add new products or
update the existing product. Also if the product is out of stock or old the admin can delete the product.

● Coupons: The system should have a coupon feature on the admin site which allows the admin to offer
coupons to users for marketing.

● Order: The system should have the order page, the page shows all delivered and in-progress orders (with the duration of delivery).

● Compute Shipping time: The system should show the user how much time it will take to deliver the
product to the user.

Non-Functional Requirement:

● Access-Security: The system should be capable to safeguard against deliberate and intrusive faults from internal and external sources, and secure with authentication of admin username and password.

● Efficiency: The response time of the system shall be fast as it does not exceed 8 seconds, and the system will give access even if connected with a low-speed network.
● Reliability: The system will not crash/fail, if the system fails, under any circumstances, to respond then it will recover in a maximum of 15 minutes and have the capability to support up to 20,000 clients per second.
● Availability: The system should be capable to give availability 24/7, and if the system does not respond or network down the system will show the last page as stored in the cache.

● Recoverability: When the system fails under any circumstances (system crash or network down) and when
the system is recovered, the system should have the capability to recover with entered data, so there is no need to renter these data again.

● Usability: The system should be user-friendly and very simple to understand the operation/function which should be deployed to make it easier for users to understand.

● Portability: The system should be compatible with all browsers in the user system.

● Maintainability: The system should be capable of finding and fixing bugs with minimum resources and
time.

● Pagination - Moving sliders

Pages =>

Feature Categories =>

Technology Used => React Router , Tailwind CSS , React Query , Context API , React Hook Form , Supabase , Stripe ( Payment API ) , JSpdf OR html-to-PDF ( generate recipets )
