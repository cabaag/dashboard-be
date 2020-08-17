import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

class CreateUserDto {
	@IsEmail()
	public email: string;

	@IsString()
	public name: string;

	@IsString()
	public password: string;

	@IsPhoneNumber('MX')
	public phone?: string;
}

export default CreateUserDto;
