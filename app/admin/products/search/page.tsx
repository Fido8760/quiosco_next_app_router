import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";

async function searchProducts(searcgTerms:string) {
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: searcgTerms,
                mode: 'insensitive'
            }
        },
        include: {
            category: true
        }
    })
    return products
}

export default async function SearchPage({searchParams} : {searchParams: {search: string}}) {
    const products = await searchProducts(searchParams.search)
    return (
        <>
            <Heading>Resultados de búsqueda: <span className=" font-black">{searchParams.search}</span></Heading>
            <div className=' flex flex-col gap-5 lg:flex-row justify-end'>
                
                <ProductSearchForm />
            </div>
            {products.length ? (
                
                <ProductTable 
                    products={products}
                />
            ) : (
                <p className=" text-center text-lg mt-10">No hay resultados</p>
            )}
        </>
    )
}