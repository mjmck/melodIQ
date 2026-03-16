import { getCurrentUser } from "@/lib/user";
import ProfileNav from "@/app/components/ProfileNav";

export default async function Reviews() {
    const user = await getCurrentUser();
    return (
        <div>
            <ProfileNav />
            
        </div>
    );
}
