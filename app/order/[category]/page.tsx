import ProductCard from "@/components/products/ProductCard"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"

async function getProducts(category: string) {
    const products = await prisma.product.findMany({
        where: {
            category: {
                slug: category
            }
        }
    })
    return products
}

// ✅ params se accede directamente (sin await)
export default async function OrderPage({ params }: { params: { category: string } }) {
    const products = await getProducts(params.category) // params.category es string
    
    return (
        <>
            
            <Heading >
                Elige y personaliza tu pedido a continuación
            </Heading>
            <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-4 gap-4 items-start">
                {products.map(product => (
                    <ProductCard 
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </>
    )
}