import React from 'react';
import { Icon } from 'antd';

export function ContactRow({
  iconType,
  onClick,
  text,
  iconStyle,
  textId,
}: {
  iconType: string;
  onClick?: () => void;
  text: string;
  iconStyle?: React.CSSProperties;
  textId?: string;
}) {
  return (
    <div className="row-center" style={{ display: 'flex', marginTop: 5 }}>
      <Icon
        type={iconType}
        style={{
          fontWeight: 'lighter',
          marginTop: 1,
          marginRight: 3,
          fontSize: 16,
          ...iconStyle,
        }}
      />
      <div
        id={textId}
        className={`subtitle ${!!onClick && 'clickable'}`}
        onClick={onClick}
      >
        {text}
      </div>
    </div>
  );
}

export function CodeExpRow({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="subtitle row-center">
      <div style={{ width: 130, textAlign: 'start' }}>{title}</div>
      {subtitle}
    </div>
  );
}

export function Button({
  children,
  onClick,
  style
}: {
  children: React.ReactChild;
  onClick?: () => void;
  style?:React.CSSProperties
}) {
  return <button onClick={onClick} style={style}>{children}</button>;
}
