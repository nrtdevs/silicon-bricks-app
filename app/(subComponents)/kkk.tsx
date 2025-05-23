// import { KeenIcon } from "@/components"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import useAppLanguage from "@/hooks/useAppLanguage"
// import { ApplyCouponToPlanDocument, CreateMultipleOrderDocument, FindPlanByIdDocument, VerifyPaymentDocument } from "@/types/generated"
// import { ApolloError, useLazyQuery, useMutation } from "@apollo/client"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { Info } from "lucide-react"
// import { useEffect, useState } from "react"
// import { Controller, useForm } from "react-hook-form"
// import { useLocation, useNavigate } from "react-router"
// import { NavLink } from "react-router-dom"
// import { toast } from "sonner"
// import z from 'zod'
// const RAZORPAYKEY = `${import.meta.env.VITE_RAZORPAY_KEY_ID}`;

// function loadRazorpayScript() {
//     return new Promise((resolve) => {
//         const script = document.createElement('script')
//         script.src = 'https://checkout.razorpay.com/v1/checkout.js'
//         script.onload = () => resolve(true)
//         script.onerror = () => resolve(false)
//         document.body.appendChild(script)
//     })
// }

// const FormSchema = z.object({
//     couponCode: z.string({
//         required_error: 'Coupon code is required',
//         invalid_type_error: 'Coupon code is required',
//     }).optional().nullable(),
//     duration: z.coerce.number({ invalid_type_error: 'Duration is a required', required_error: 'Duration is required', }).min(1, { message: 'Duration must be at least 1' }),
// })

// const SubscriptionPayment = () => {
//     const { FM } = useAppLanguage();
//     const [FindPlanbyId, { data }] = useLazyQuery(FindPlanByIdDocument)
//     const [showCouponInput, setShowCouponInput] = useState(false);
//     const [ApplyCouponCode] = useMutation(ApplyCouponToPlanDocument)
//     const [CreatePayment] = useMutation(CreateMultipleOrderDocument)
//     const [verifyPayment] = useMutation(VerifyPaymentDocument)
//     const [applyCoupon, setApplyCoupon] = useState<number | null | undefined>(0);
//     const location = useLocation();
//     const { id } = location.state || {};
//     const [priceCheck, setPriceCheck] = useState<number | null>(0);
//     const [durationCheck, setDurationCheck] = useState<number | null>(0);

//     const navigate = useNavigate()


//     const { handleSubmit, control, watch, formState: { errors } } = useForm<z.infer<typeof FormSchema>>({
//         reValidateMode: 'onChange',
//         resolver: zodResolver(FormSchema),
//     });

//     useEffect(() => {
//         if (!id) return;
//         FindPlanbyId({ variables: { findPlanByIdId: Number(id) } });
//     }, [id, FindPlanbyId]);



//     const duration = Number(watch('duration')) || 0;
//     const price = Number(data?.findPlanById?.price) || 0;
//     const totalPrice = duration > 0 ? (priceCheck ?? 0) * (durationCheck ?? 0) : (priceCheck ?? 0);

//     const finalTotal = totalPrice - (applyCoupon ?? 0);

//     const WithOfferPLanPrice = Number(data?.findPlanById?.price) + Number(data?.findPlanById?.discountedPrice);


//     useEffect(() => {
//         setPriceCheck(price)
//         setDurationCheck(duration)
//     }, [price, duration])


//     const onSubmit = handleSubmit(async (formData) => {
//         const scriptLoaded = await loadRazorpayScript()
//         if (!scriptLoaded) {
//             toast.error(FM('FAILED_DUE_TO_ERROR'));
//             return
//         }

//         const response = await CreatePayment({
//             variables: {
//                 input: {
//                     planIds: [Number(id)],
//                     duration: Number(formData.duration),
//                     couponCode: formData.couponCode ?? '',
//                     amount: finalTotal,
//                 }
//             }
//         })
//         const order = response?.data?.createMultipleOrder

//         const options = {
//             key: RAZORPAYKEY,
//             amount: finalTotal,
//             currency: order.currency,
//             duration: formData.duration,
//             order_id: order.id,
//             Image: 'https://example.com/your_logo',
//             handlePaymentSuccess,
//             name: data?.findPlanById?.name,
//             handler: function (response: any) {
//                 handlePaymentSuccess(response)
//             },
//             theme: { color: '#3399cc' },
//         }
//         const paymentObject = new (window as any).Razorpay(options)
//         paymentObject.open()
//     });

//     const handlePaymentSuccess = async ({ razorpay_order_id, razorpay_payment_id, razorpay_signature }: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
//         try {
//             const reponse = await verifyPayment({
//                 variables: {
//                     input: {
//                         planIds: [Number(id)],
//                         amount: finalTotal,
//                         duration: Number(watch('duration')),
//                         couponCode: watch('couponCode') ?? '',
//                         razorpayOrderId: razorpay_order_id,
//                         razorpayPaymentId: razorpay_payment_id,
//                         razorpaySignature: razorpay_signature,
//                     },
//                 },
//             });
//             if (reponse?.data?.verifyPayment) {
//                 toast.success(FM('PAYMENT_SUCCESSFUL'));
//                 navigate('/dashboard');
//             } else {
//                 toast.error(
//                     FM('PAYMENT_FAILED')
//                 );
//             }
//         }
//         catch (error) {
//             const apolloError = error as ApolloError;
//             toast.error(apolloError?.message || FM('FAILED_DUE_TO_ERROR'));
//         }
//     }

//     const handleApplyCoupon = async () => {
//         const couponCode = watch('couponCode')
//         try {
//             const ApplyRes = await ApplyCouponCode({
//                 variables: {
//                     couponCode: String(couponCode),
//                     planId: Number(id),
//                 },
//             });
//             toast.success(FM('COUPON_APPLIED_SUCCESSFULLY'));
//             setShowCouponInput(false);
//             setApplyCoupon((ApplyRes?.data?.applyCouponToPlan?.price ?? 0) - (ApplyRes?.data?.applyCouponToPlan?.discountedPrice ?? 0));
//             //   console.log(ApplyRes?.data?.applyCouponToPlan?.discountedPrice, 'ApplyRes?.data?.applyCouponToPlan?.discountedPrice')

//         }
//         catch (error) {
//             const apolloError = error as ApolloError;
//             toast.error(apolloError?.message || FM('FAILED_DUE_TO_ERROR'));
//         }
//     }



//     return (
//         <>
//             <div className="h-screen flex flex-col justify-between bg-white dark:bg-neutral-900 transition-colors duration-300">
//                 <div className="flex flex-col p-6">
//                     <div className="flex items-center justify-between mb-4 gap-3">
//                         <h1 className="text-3xl font-bold text-purple-900 dark:text-purple-200">Subscription Payment</h1>
//                         <NavLink to={'/'} end>
//                             <button className="btn bg-neutral-950 text-neutral-50 dark:bg-neutral-200 dark:text-neutral-900 btn-sm">
//                                 <KeenIcon icon="exit-left" /> {FM('BACK')}
//                             </button>
//                         </NavLink>
//                     </div>

//                     <form onSubmit={onSubmit}>
//                         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//                             {/* Left Card */}
//                             <div className="space-y-6 lg:col-span-3">
//                                 <Card className="shadow-lg bg-white dark:bg-neutral-800">
//                                     <CardHeader>
//                                         <CardTitle className="text-2xl font-bold text-purple-900 dark:text-purple-200">
//                                             {data?.findPlanById?.name}
//                                         </CardTitle>
//                                     </CardHeader>
//                                     <CardContent className="space-y-6">
//                                         <div className="grid gap-4 md:grid-cols-2">
//                                             <div className="space-y-2">
//                                                 <Label className="dark:text-gray-300">{FM('subscription-period')}</Label>
//                                                 <Controller
//                                                     name="duration"
//                                                     control={control}
//                                                     render={({ field }) => (
//                                                         <Select
//                                                             value={field.value ? String(field.value) : undefined}
//                                                             onValueChange={(value) =>
//                                                                 field.onChange(Number(value),
//                                                                     setPriceCheck(price),
//                                                                     setDurationCheck(Number(value))
//                                                                 )}
//                                                         >
//                                                             <SelectTrigger className={`input bg-white dark:bg-neutral-700 dark:text-white ${errors.duration ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}>
//                                                                 <SelectValue placeholder="Select duration" />
//                                                             </SelectTrigger>
//                                                             <SelectContent className="dark:bg-neutral-800 dark:text-white">
//                                                                 <SelectItem value="1">{FM('1_month')}</SelectItem>
//                                                                 <SelectItem value="3">{FM('3_months')}</SelectItem>
//                                                                 <SelectItem value="6">{FM('6_months')}</SelectItem>
//                                                                 <SelectItem value="9">{FM('9_months')}</SelectItem>
//                                                                 <SelectItem value="12">{FM('12_months')}</SelectItem>
//                                                                 <SelectItem value="24">{FM('24_months')}</SelectItem>
//                                                                 <SelectItem value="36">{FM('36_months')}</SelectItem>
//                                                                 <SelectItem value="48">{FM('48_months')}</SelectItem>
//                                                             </SelectContent>
//                                                         </Select>
//                                                     )}
//                                                 />
//                                                 {errors.duration && (
//                                                     <p className="text-sm text-red-500">{errors.duration.message}</p>
//                                                 )}
//                                             </div>
//                                             <div className="space-y-2">
//                                                 <div className="mt-7 flex items-center gap-2 rounded-lg bg-green-100 dark:bg-green-800 p-3">
//                                                     <Info className="h-5 w-5 text-green-600 dark:text-green-300" />
//                                                     <span className="text-sm text-green-800 dark:text-green-200">
//                                                         Renews at ₹{data?.findPlanById?.price}/m for 4 years. Cancel anytime.
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         <div className="rounded-lg border bg-white dark:bg-neutral-700 p-4 shadow-sm">
//                                             <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
//                                                 <div>
//                                                     <p className="text-xl font-bold text-purple-800 dark:text-purple-200">
//                                                         ₹{data?.findPlanById?.price}/month
//                                                     </p>
//                                                     <p className="text-sm text-gray-400 dark:text-gray-500 line-through">
//                                                         ₹{WithOfferPLanPrice}/month
//                                                     </p>
//                                                 </div>
//                                                 {applyCoupon != null && (applyCoupon ?? 0) > 0 && (
//                                                     <div className="rounded-full bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 font-semibold px-4 py-2">
//                                                         SAVE ₹{applyCoupon}
//                                                     </div>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     </CardContent>
//                                 </Card>
//                             </div>

//                             {/* Right Card */}
//                             <div className="md:col-span-1">
//                                 <Card className="shadow-lg bg-white dark:bg-neutral-800">
//                                     <CardHeader>
//                                         <CardTitle className="text-lg text-purple-900 dark:text-purple-200">{FM('Subtotal')}</CardTitle>
//                                     </CardHeader>
//                                     <CardContent className="space-y-2">
//                                         <div className="flex justify-between">
//                                             <span className="text-lg font-semibold text-black dark:text-white">{FM('price')}</span>
//                                             <span className="text-lg font-semibold text-black dark:text-white">₹{totalPrice}</span>
//                                         </div>
//                                         <p className="text-sm text-gray-500 dark:text-gray-400">{FM('Subtotal_does_not_include_applicable_taxes')}</p>
//                                         <div className="flex justify-between text-sm text-green-600 dark:text-green-300">
//                                             <span>{FM('discount')} %</span>
//                                             <span>–₹{applyCoupon}</span>
//                                         </div>
//                                         <div className="text-sm text-purple-600 underline cursor-pointer dark:text-purple-300">
//                                             <span onClick={() => setShowCouponInput(!showCouponInput)}>{FM('have_a_coupon_code')}?</span>
//                                         </div>
//                                         {showCouponInput && (
//                                             <div className="input-group">
//                                                 <Controller
//                                                     name="couponCode"
//                                                     control={control}
//                                                     render={({ field }) => (
//                                                         <Input
//                                                             {...field}
//                                                             value={field.value ?? ''}
//                                                             placeholder="Enter coupon code"
//                                                             className={`input bg-white dark:bg-neutral-700 dark:text-white ${errors.couponCode ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
//                                                         />
//                                                     )}
//                                                 />
//                                                 {errors.couponCode && (
//                                                     <p className="text-sm text-red-500">{errors.couponCode.message}</p>
//                                                 )}
//                                                 <span className="btn btn-input cursor-pointer bg-neutral-950 text-neutral-50 dark:bg-neutral-200 dark:text-neutral-900" onClick={handleApplyCoupon}>
//                                                     {FM('apply')}
//                                                 </span>
//                                             </div>
//                                         )}
//                                         <div className="flex justify-between text-sm text-purple-600 dark:text-purple-300">
//                                             <span>{FM('total')}</span>
//                                             <span className="text-lg font-semibold text-black dark:text-white">₹{finalTotal}</span>
//                                         </div>
//                                     </CardContent>
//                                     <CardFooter className="flex justify-center">
//                                         <Button type="submit" className="btn btn-primary w-full">
//                                             {FM('proceed_to_payment')}
//                                         </Button>
//                                     </CardFooter>
//                                 </Card>
//                             </div>
//                         </div>
//                     </form>
//                 </div>

//                 <div className="text-center py-4">
//                     <span className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400">
//                         <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-1 mt-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-6a9 9 0 11-18 0 9 9 0 0118 0z" />
//                         </svg>
//                         <span>30-day money-back guarantee</span>
//                     </span>
//                 </div>
//             </div>

//         </>
//     )
// }

// export default SubscriptionPayment