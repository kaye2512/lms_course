
const { PrismaClient } = require('@prisma/client')

const database = new PrismaClient()

async function main() {
    try {
        await database.category.createMany({
            data: [
                { name: "Computer"},
                { name: "Music"},
                { name: "Fitness"},
                { name: "Photography"},
                { name: "Accounting"},
                { name: "Engeneering"},
                { name: "Filming"},
            ]
        })

        console.log("Successfully created")
    }catch (error) {
        console.log("Error seeding the database categories", error)
    }finally {
        await database.$disconnect();
    }
}

main()