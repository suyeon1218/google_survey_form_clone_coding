import TextField from '../TextField';

interface InputLongProps {
	placeholder?: string;
}

const InputLong = ({ placeholder = '내 답변' }: InputLongProps) => {
	return <TextField placeholder={placeholder} />;
};

export default InputLong;
