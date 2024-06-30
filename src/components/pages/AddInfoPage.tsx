import { AddInfoForm } from '../forms/AddInfoForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function AddInfoPage() {
  return (
    <>
      <div className="mt-14 sm:max-w-96 sm:mx-auto mx-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-extrabold text-center text-lg mb-8">
              Profile info
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AddInfoForm />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default AddInfoPage;
