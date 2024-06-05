import { LoginForm } from "../forms/LoginForm"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


function LoginPage() {
  return <>
  
  <div className="mt-14 sm:max-w-96 sm:mx-auto mx-8">
    <Card>
      <CardHeader>
        <CardTitle className="font-extrabold text-center text-lg mb-8">ورود به حساب کاربری</CardTitle>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  </div>
  </>
}

export default LoginPage