import { fetchMe } from "@/api/user/queries";
import { CreateMerchantProfileForm } from "@/components/forms/CreateMerchantProfileForm";

export default async function LoginPage() {
    const me = await fetchMe();
    if(!me)return null;

  return (
    <main className="container flex flex-col max-w-sm mb-8">
      <CreateMerchantProfileForm vpaType={me.region == 'EU' ? 'Iban' : me.region == 'IN' ? 'Upi id' : 'Pix key'} />
    </main>
  )
}