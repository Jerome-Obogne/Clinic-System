import Buttons from '@/components/ui/Buttons';
import type { AccountModel } from '@/model/Account.model';
import { TextField } from '@mui/material';
import { memo, useEffect, useState } from 'react'

interface AccountProps extends AccountModel {
    onSubmit: (fieldValue:string |undefined, value:string) => void,
    value:string
}

const AccountField = ({ label, name, onSubmit,value }: AccountProps) => {
  const [isEdit, setIsEdit] = useState(false)
  const [tempValue, setTempValue] = useState(value);

  useEffect(()=> {
    setTempValue(value)
  },[value])

  const handleToogleEdit = () => {
    setIsEdit((prev) => !prev)
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTempValue(event.target.value)
  };
  
  const handleCancel = () => {
    setTempValue(value)
    setIsEdit(false);
    
  }

  const handleUpdateAccount = () => {
    onSubmit(name,tempValue);
    setIsEdit(false);
  };

  
  return (
    <div key={label}>
      <label className="">{label}</label>
      <div className="flex flex-wrap justify-between gap-2 my-2">
        <div className="w-90">
          {isEdit ? (
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={tempValue}
              onChange={handleChange}
            />
          ) : (
            <h3>{value}</h3>
          )}
        </div>

        {isEdit ? (
          <>
            <Buttons
              onClick={handleUpdateAccount}
              type="submit"
              variant="outlined"
              className="!p-[8px] normal-case! max-w-[200px] border-0! hover:bg-transparent!"
              size="small"
            >
              Update
            </Buttons>
            <Buttons
              onClick={handleCancel}
              type="submit"
              variant="outlined"
              className="!p-[8px] normal-case! max-w-[200px] border-0! hover:bg-transparent! text-[red]!"
              size="small"
            >
              Cancel
            </Buttons>
          </>
        ) : (
          <Buttons
            onClick={handleToogleEdit}
            type="submit"
            variant="outlined"
            className="!p-[8px] normal-case! max-w-[200px] border-0! hover:bg-transparent!"
            size="small"
            isDisabled={label == "Email" && true}
          >
            {label == "Email" ? 'Done' : 'Edit' } 
          </Buttons>
        )}
      </div>
    </div>
  );
};

export default memo(AccountField)