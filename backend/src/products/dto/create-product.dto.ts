//export class CreateProductDto {}
import {Product} from '@prisma/client'

export type CreateProductDto=Omit<Product,'id'|'createdAt'|'updatedAt'>


C:\NestJs\nest-next-crud\frontend\backend\prisma