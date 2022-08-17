import { Request, Response, NextFunction } from "express";
import { FoodDoc, Vendor } from "../models";

export const GetFoodAvailability = async(req: Request, res: Response, next: NextFunction) => {
	const pinCode = req.params.pinCode;

	const result = await Vendor.find({ pinCode: pinCode, serviceAvailable: true})
	.sort({rating: -1})
	.populate('foods')

	if(result.length > 0){
		return res.status(200).json(result)
	}

	return res.status(400).json({ msg: "Data Not found!"})
}

export const GetTopRestaurants = async(req: Request, res: Response, next: NextFunction) => {
	const pinCode = req.params.pinCode;

	const result = await Vendor.find({ pinCode: pinCode, serviceAvailable: true})
	.sort({rating: -1})
	.limit(10)

	if(result.length > 0){
		return res.status(200).json(result)
	}

	return res.status(400).json({ msg: "Data Not found!"})
}

export const GetFoodsIn30Min = async(req: Request, res: Response, next: NextFunction) => {
	const pinCode = req.params.pinCode;

	const result = await Vendor.find({ pinCode: pinCode, serviceAvailable: true})
	.populate('foods')

	if(result.length > 0){

		let foodResult: any =[];

		result.map(vendor => {
			const foods = vendor.foods as [FoodDoc]
			
			foodResult.push(...foods.filter(food => food.readyTime <= 30))
		})

		return res.status(200).json(foodResult)
	}

	return res.status(400).json({ msg: "Data Not found!"})
}

export const SearchFoods = async(req: Request, res: Response, next: NextFunction) => {
	const pinCode = req.params.pinCode;

	const result = await Vendor.find({ pinCode: pinCode, serviceAvailable: true})
	.populate('foods')

	if(result.length > 0){

		let foodResult: any =[];
			
		result.map( item => foodResult.push(...item.foods))

		return res.status(200).json(foodResult)
	}

	return res.status(400).json({ msg: "Data Not found!"})
}

export const RestaurantID = async(req: Request, res: Response, next: NextFunction) => {
	const id = req.params.id;

	const result = await Vendor.findById(id).populate('foods')

	if(result){
		return res.status(200).json(result)
	}

	return res.status(400).json({ msg: "Data Not found!"})
}

