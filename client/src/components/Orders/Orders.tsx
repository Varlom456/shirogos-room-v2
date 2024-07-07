import { FC, useState } from 'react'
import CurrentOrders from './CurrentOrders'
import PastOrders from './PastOrders'
import { cn } from '@/utils/cn'

interface OrdersProps {
	className?: string
}

const Orders: FC<OrdersProps> = ({ className }) => {
	const [isPastOrders, setIsPastOrders] = useState<boolean>(false)

	return (
		<div className={cn('w-[38.8125rem] h-[19.5rem] relative', className)}>
			<CurrentOrders
				isPastOrders={isPastOrders}
				setIsPastOrders={setIsPastOrders}
			/>
			<PastOrders
				isPastOrders={isPastOrders}
				setIsPastOrders={setIsPastOrders}
			/>
		</div>
	)
}

export default Orders
