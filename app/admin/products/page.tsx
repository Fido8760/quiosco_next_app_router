import { redirect } from 'next/navigation'
import ProductsPagination from "@/components/products/ProductsPagination";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from 'next/link';
import ProductSearchForm from '@/components/products/ProductSearchForm';

async function productCount() {
    return await prisma.product.count()
}

async function getProducts(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize
    return await prisma.product.findMany({
        take: pageSize,
        skip, 
        include: { category: true }
    })
}

type SearchParams = {
    page?: string;
    query?: string;  // Si usas búsqueda
}

export default async function ProductsPage({ searchParams }: { searchParams: SearchParams }) {
    const pageSize = 10
    const rawPage = searchParams?.page
    const page = Number(rawPage) || 1

    // Validación completa de la página
    if (isNaN(page) || page < 1 || !Number.isInteger(page)) {
        redirect('/admin/products?page=1')
    }

    const [products, totalProducts] = await Promise.all([
        getProducts(page, pageSize),
        productCount()
    ])

    const totalPages = Math.ceil(totalProducts / pageSize)

    // Redirección si la página excede el máximo
    if (page > totalPages && totalPages > 0) {
        redirect(`/admin/products?page=${totalPages}`)
    }

    return (
        <>
            <Heading>Administrar Productos</Heading>
            
            <div className='flex flex-col gap-5 lg:flex-row justify-between'>
                <Link 
                    href='/admin/products/new'
                    className='bg-amber-400 hover:bg-amber-500 transition-colors w-full lg:w-auto text-xl px-10 py-3 text-center font-bold'
                >
                    Crear Producto
                </Link>
                <ProductSearchForm />
            </div>

            <ProductTable products={products} />

            {totalPages > 0 && (
                <ProductsPagination 
                    page={page}
                    totalPages={totalPages}
                />
            )}
        </>
    )
}
