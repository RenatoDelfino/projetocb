import Link from "next/link";
import Image from "next/image"
import { formatPrice } from "@/utils/format-price";
import { useUser } from "@/context/userContext";
import { formatDiscountPrice } from "@/utils/format-discount";
import { Star } from "lucide-react";

interface ProductProps {
  product: {
    image: {
      url: string
    };
    name: string;
    reviews: {
      stars: any
    }[]
    price: number;
    coupon: {
      discount: number
    };
    pix: number;
    slug: string;
  }
}

export function Product({ product }: ProductProps) {
  const starsArray = product.reviews.map(review => review.stars);
  const totalStars = starsArray.reduce((acc, stars) => acc + stars, 0);
  const averageStars = totalStars / starsArray.length;

  const { user } = useUser()

  const discount = user?.birthday ? product.coupon?.discount : 0
  const productPriceFormatted = formatDiscountPrice(discount, product.price);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="flex flex-col border-[#e7e7e7] border-[1px] p-6 rounded-md w-full max-w-[240px] hover:border-borderProduct transition-colors"
    >
      <div className="flex flex-col mb-1 h-full">
        <Image
          src={product.image?.url}
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          className="h-full w-full"
        />
        <strong className="text-xs whitespace-nowrap overflow-hidden text-ellipsis mb-2">{product.name}</strong>

        {product.reviews.length > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: averageStars ?? 0 }).map((item, index) => (
                <Star size={10} fill="orange" color="orange" key={index} />
              ))}
              <span className="text-[10px] leading-3">({product.reviews.length})</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <p className={`text-xs text-price ${user?.birthday && "line-through"}`}>{formatPrice(product.price)}</p>
          {user?.birthday && product.coupon?.discount && <span className="block bg-green-700 text-white text-xs rounded-sm px-1">- {product.coupon.discount}%</span>}
        </div>

        <p className="mt-1 text-xs">
          {formatPrice(productPriceFormatted)} em até 10x de {formatPrice(productPriceFormatted / 10)} sem juros.
        </p>
        <strong className="text-productPrice font-extra-bold mt-1">{formatPrice(product.pix ?? productPriceFormatted)}</strong>
        {product.pix && <small className="text-blue-900 text-xs font-bold">no Pix</small>}
      </div>
    </Link >
  )
}

export function ProductSkeleton() {
  return (
    <div className="border-[#e7e7e7] border-[1px] p-4 rounded-md min-w-[240px] animate-pulse">
      <div className="flex flex-col gap-4">
        <div className="h-[180px] bg-black/5" />
        <strong className="text-xs bg-black/5 h-4" />
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-2 mb-2s">
          <p className="line-through text-xs text-price bg-black/5 h-4" />
        </div>

        <p className="mt-1 text-xs bg-black/5 h-4" />
        <strong className="text-blue-900 font-extra-bold mt-2 bg-black/5 h-4" />
      </div>
    </div>
  )
}