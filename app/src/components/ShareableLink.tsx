import { FaCopy } from 'react-icons/fa';

import Input from './Input';
import IconButton from './IconButton';
import message from '../languages/en';

interface ShareableLinkProps {
  link: string;
}

function ShareableLink(props: ShareableLinkProps) {
  const { link } = props;

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
  };

  return (
    <div className="flex flex-col items-start space-y-2 p-4">
      <label className="text-xs font-normal text-gray-700">
        {message.TITLE.SHARE_LINK}
      </label>

      <div className="flex items-center space-x-2 w-full">
        <Input
          readOnly
          type="text"
          value={link}
          showLabel={false}
          className="w-full bg-gray-100"
        />

        <IconButton
          className="bg-blue-50 hover:bg-blue-100"
          icon={<FaCopy size={18} className="text-blue-400" />}
          onClick={handleCopy}
        />
      </div>
    </div>
  );
}

export default ShareableLink;
