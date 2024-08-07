'use client';
import { useEffect, useState } from "react";
import { FaFacebookF, FaTwitter, FaTiktok , FaInstagram } from "react-icons/fa";
import { TfiYoutube } from "react-icons/tfi";

import { useCollectionTypesStores } from "@/app/apis/stores/collectionTypesStore";

import SocialItem from "./SocialItem";

const Social = () => {
    const [socials, setSocials] = useState<any>({});
    const { getSocials } = useCollectionTypesStores();
    const socialIcon: any = [
        {
            icon: FaTwitter,
            title: 'twitter'
        },
        {
            icon: FaFacebookF,
            title: 'facebook'
        },
        {
            icon: FaTiktok,
            title: 'tiktok'
        },
        {
            icon: TfiYoutube,
            title: 'youtube'
        },
        {
            icon: FaInstagram,
            title: 'instagram'
        }
    ];    

    useEffect(() => {
        const onSuccess = (res: any) => {
            if (res) {
              const socialData = res?.map((social: any) => ({
                  icon: socialIcon.find((item: any) => item.title === social?.attributes.Title.toLowerCase())?.icon,
                  title: social?.attributes.Title,
                  link: social?.attributes.Link
              }));
            setSocials(socialData);
          };      
        };
    
        getSocials(onSuccess)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getSocials]);    

    return (
        <ul id="social-list">
            {socials.length > 0 && socials.map((item: any, index: number) => (
                <li key={index} className="inline-block mx-[15px] first:ml-0 last:mr-0">
                    <SocialItem icon={item.icon} href={item.link} title={item.title} className="opacity-60 hover:opacity-100" />
                </li>
            ))}
        </ul>
    )
}
 
export default Social;