class CrudRepository{
    constructor(model){
        this.model = model;
    }

    async create(data){
        try {
            const result = await this.model.create(data);

            return result;   
        } catch (error) {
            console.log(error);
            throw new Error("Error in repository to create document");
        }
    }

    async delete(id) {
        try {
            const result = await this.model.findByIdAndDelete(id);
            return result;
        } catch (error) {
            console.log("Something went wrong in crud repo");
            throw error;
        }
    }

    async findBy(data) {
        try {
            console.log("FindBy method data:",data);
            const result = await this.model.findOne(data).lean();
            return result;
        } catch (error) {
            console.log("Something went wrong in crud repo in findBy method with error message:",error);
            throw error;
        }
    }

    async getAll() {
        try {
            const result = await this.model.find({});
            return result;
        } catch (error) {
            console.log("Something went wrong in crud repo");
            throw error;
        }
    }

    async update(id, data) {
        try {
            const result = await this.model.findByIdAndUpdate(id, data, {new: true});
            return result;
        } catch(error) {
            console.log("Something went wrong in crud repo");
            throw error;
        }
    }
};

module.exports = CrudRepository;