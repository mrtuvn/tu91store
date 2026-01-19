import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Sâm tươi",
    href: "#",
    imageSrc: "/images/products/fresh-ginseng.jpeg",
    imageAlt: "Fresh ginseng",
    price: "Liên hệ",
    color: "Non",
  },
  {
    id: 2,
    name: "Sâm đen mật ong",
    href: "#",
    imageSrc: "/images/products/black-ginseng.jpeg",
    imageAlt: "Black ginseng",
    price: "Liên hệ",
    color: "Non",
  },
  {
    id: 3,
    name: "Hồng sâm mật ong",
    href: "#",
    imageSrc: "/images/products/red-ginseng.jpeg",
    imageAlt: "Red ginseng",
    price: "Liên hệ",
    color: "Non",
  },
  {
    id: 4,
    name: "Sâm lát chia gói",
    href: "#",
    imageSrc: "/images/products/red-ginseng2.jpeg",
    imageAlt: "Sâm lát",
    price: "Liên hệ",
    color: "Non",
  },
];

export default function Home() {
  return (
    <div className="bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full py-14 px-10 bg-white dark:bg-black">
        <div className="container flex flex-col items-center gap-6 text-center sm:items-start ">
          <h1 className="text-2xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Tu91 Store
          </h1>
        </div>
        <section>
          <div className="container text-2xl text-center">Sản phấm mới</div>

          <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {products.map((product) => (
                  <div key={product.id} className="group relative">
                    <Image
                      width={300}
                      height={300}
                      fetchPriority="high"
                      quality={80}
                      alt={product.imageAlt}
                      src={product.imageSrc}
                      className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                      loading="lazy"
                    />
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <a href={product.href}>
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {product.name}
                          </a>
                        </h3>
                        {/* <p className="mt-1 text-sm text-gray-500">
                          {product.color}
                        </p> */}
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        <span className="font-bold">Giá:</span> Liên hệ
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
