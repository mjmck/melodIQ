import Image from "next/image";

interface ProfilePictureProps {
  src?: string;
  size?: number;
  alt?: string;
}

export default function ProfilePicture({ src, size = 40, alt = "Profile" }: ProfilePictureProps) {
  return (
    <div className="relative inline-block">
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          className="rounded-full object-cover"
        />
      ) : (
        <div
          className="bg-gray-300 rounded-full flex items-center justify-center text-white"
          style={{ width: size, height: size }}
        >
          {alt[0].toUpperCase()}
        </div>
      )}
    </div>
  );
}