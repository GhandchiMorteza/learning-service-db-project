import { SignupForm } from '../forms/SignupForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function SignupPage() {
  return (
    <>
      <div className="mt-14 sm:max-w-96 sm:mx-auto mx-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-extrabold text-center text-lg mb-8">
              Sign up Form
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SignupForm />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default SignupPage;
