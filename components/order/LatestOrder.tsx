import { OrderWithProducts } from "@/src/types"

type LatestOrderProps = {
    order: OrderWithProducts
}

export default function LatestOrder({order} : LatestOrderProps) {
    return (
        <div className=" bg-white shadow p-5 rounded-lg">
            <p className=" text-lg font-bold text-slate-600">Cliente:{' '}
                <span className=" text-slate-900 text-2xl" >{order.name}</span>
            </p>
            <ul
                className=" divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium"
                role="list"
            >
                {order.orderProducts.map(product => (
                    <li 
                        key={product.id}
                        className=" flex py-6 text-lg"
                    >
                        <p>
                            <span className=" font-bold">({product.quantity}){' '}</span>
                            {product.product.name}
                        </p>
                    </li>
                ))}

            </ul>
        </div>
    )
}
