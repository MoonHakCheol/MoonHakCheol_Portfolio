import { useSound } from '../../context/sound-context';
import styles from './Button.module.css';

/**
 * variant: 'primary' | 'secondary'
 * as: 'button' | 'a' (링크로 쓰려면 as="a" + href)
 */
function Button({
  children,
  variant = 'primary',
  as = 'button',
  className = '',
  onClick,
  ...rest
}) {
  const { play } = useSound();
  const Tag = as;

  const handleClick = (e) => {
    play('click');
    onClick?.(e);
  };

  return (
    <Tag
      className={`${styles.button} ${styles[variant]} ${className}`}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default Button;
