/* get Tailwind classes for different button status.
this is useful for reusing in different components.
*/

export const Color_btn: { [key: string]: string } = {
  default: 'bg-text-bg cursor-pointer',
  active: 'bg-primary text-text-bg cursor-pointer',
  inActive: 'bg-text-bg text-primary cursor-pointer',
  disabled: 'bg-gray-400 text-black',
};
