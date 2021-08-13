import React from 'react';
import axios from 'axios';

import Info from '../Info';
import { useCart } from '../../hooks/useCart';

import styles from './Drawer.module.scss';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [], opened }) {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('/orders', {
        items: cartItems,
      });
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('/cart/' + item.id);
        await delay(1000);
      }
    } catch (error) {
      alert('Ошибка при создании заказа :(');
    }
    setIsLoading(false);
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between mb-30">
          Корзина <img width={30} height={30} onClick={onClose} className="cu-p" src="data:image/png;base64,
          iVBORw0KGgoAAAANSUhEUgAAAOEAAADgCAMAAADCMfHtAAAAe1BMVEX///8AAADw8P
          DFxcXz8/PAwMDY2Nibm5uYmJihoaH6+vrq6uplZWWnp6dGRkbOzs5aWlp5eXmMjIwtL
          S3e3t5xcXGsrKzl5eXT09OTk5NOTk4cHBx/f3+5ublsbGwSEhI8PDwzMzNWVlY9PT0n
          Jyd+fn6Hh4cWFhZJSUmDdjPoAAAKm0lEQVR4nNVd12LqOhBM6DEYx9QAh+KEkPz/F97r4
          0No9syqK/NsbC2StpenJw8Y9tqLtH/K57vdaDTa7eb5qZ8u2r2hj487RbLsDvLx/rkZ+
          3E+6M6S0AvVwmyRF4C0W0zzRS/0gpWQDdZi4i5Yr7LQCxdhmb5rUPdDZboMTQBGb7IxI
          K/CZvIWmowmzCbG1J1xmoUm5hGddGqNvhLTl05okm6QjaySV2EUD+NZmF++emwWMUjKjr3
          bV4dJ6MPa+nRKX4m8FZK+3Dl9QWlMTl7oK3EKch9fvNFX4sU7fW1kMbjAvuuVvqGOZm2
          KtUdzchCAvhIDT/T1joEIfH4+erEi/XHQOpyc0zcLt4EVjo7NDr8ioh4uBUdiYr7bw7s
          z+d8LTdoPHDGcNDRdV0hdEDg3X9fX9PAxPhRHC/rQ3Dp9yYf+atZ/XrpvwxtDL2kts+1
          gPtZ/6djyZRxq/u2jlwybsMP24FXv1XurStybzhLmW+kaZqkWlRa9jl3ljxcDVcGcnb6
          Uv2LN3FgofnjT1ztAPWWFcGGHQEU95tNEWLUV3ZJW9Ju+yhePxv6/lppp1jcnUOWD33Z
          8uFsV7d7YZlTYwVd7ulS3kH/WcBflmtq3XV2xK/ejG2lwW+lXpvZjDHIOvtX/SOblb2y
          EWHi0db8wE35g58peW0qVYU27vyV7+95lEEzKB/T8/jKenVum6Q6tb9EqjjrvlinD2l
          dADJlK9ar+YlFYcO0jYjITWW4T1deKzImVC4JqIDpOiobGUPJO9yf0DJHqqGbQCBIrNj7z
          7toCCqcqL/zD32fbT0Igkc1/5K8T/GMjd8TUoyMQXuJrk/B3OZaCtasSKDjSc8VZl/sIUB

          248BdKRW5QKMseS+CRZ5GZ0YmWQAmJkgQj6gtSYFnWQe+igANSPmo/YqACKqg5P2VK4LsH
          MgDoHdqzN6zIC5QUBxdYMhKJskz10dCpggLXCtYmGZuJoWaAGYyQ2bA4tqU4gSF2BttAIpZ
          h2egFREUdN/+SSAotZ4gLMG7TLDGIsImn2IN4i4um3xHPhRu3rx6IcdDk0cBb+O2VBAJi4
          DVIbXILQyaUP4Kct/qbiBlpTGe0BD6ntewUy8LGyxsKJOZQJxOxOhNfqRVWbWoUG/yfBPDLU
          OAY6iPbwEZFeIX7EZgzPpoY8HFfKeRqwD6N+6cx9w2xfg7MG++lPmS+sUmKM+Ci7zyLmM+EW
          T8HdvXf8hrIemPdQqWTV/zGLSRZoTdKCjS4fMVBdQA1zWtrD+Z2xaVy3wKKgOt8sAI8twu
          2fAkQhVfHFPoQo+1w8BdQFbv4FZFTIBrnTD2gmLu4BhHT9V+eqgZUqHQR+rKdjhMw2nl+CPnJo
          /LO1AF6bM4pd+i2xuHlRkCW+1mUI7EZszCsgI7p2V0DHjkEXLoQ8JhWjyDlzkKyv3MgQ7gS5s
          iuiM8B9Qi0/krWoasaePEiICuxcrmByL333C4tAAr/RvVR7D9e2/ca6BCWTkIk73/DNcQXsZT5
          SO0OvXYZkDAoNRaQSwrCxTEBScQygQuIkzApiOoAcf31E3T/x6+UVgCF9JsnyGtl2TMdgpYBZB
          QiNxN2swniMQuDknoJDhKBhfxRS8iI6KvFxW0m4FmxSKt5Q8YHZaWeerlQbx9ipltUHcZ0Nm+t
          QNaMRPDbFBn4JNvZYzMXlm52aP7p6gk0BiRuNp/9lEjmL3AW5ijRD19xcY2wDZDMXyAQd4h8XBw
          KToYD4H8blBK+oux36M8XVbfZA+brQOR/oGQ2aDuptgMxBdQ+AFefIrUUZlsKytusAvIa8HdvkA8D
          aoWanYG0ARk74Hp7JCwhhQZ9o7QALTnE1xGF8OgXdgmggHlnSPX+NXv46WIPIYUuepQjwHwJSCHgNJCX
          um3j/QjobwC8dI+kBZSHXpW2Z6J+AHm4QRIfvpQXYtoFWgvSaaaIY2C91K9AxLYquDIfaKFY29Xqw6cN
          /G8D2+IVWU/EPvTJTQ94KWCbdsgCJja+z5tIAihF8y9z5MVgfhp/bgyW1AN+ukKMlvrafF1FVh6PfG0p
          VgcYhD2ODEEdpshfuoX7IPB5t53TeOKrQIr3G/Tqi9ISW1kXo22ATBSjRXGLJbylvyX2hAqDn2B0LWR/
          CBUAz20ZXQMR0o/QS5cBsdIyIIBcSjGMW+JAzLI8hsgtGEODAQ4UAitZCYoB/o58GmTllBo7Ui9/fU5U
          JdJRv5bQi5cAaTRVRAdZQb/hIqJrOKJPxFwRdAbKlaiMEsRsoyvhfgTMEf6nd6JHYi9GkJUjoG2OX14g
          WXG2cFE1QvTJe/CQntkIzPuJp2VLPeAh/fHQoYfiLFS/AJas/zyFjvJXwNULANMJLpVdMCYfz8zaOsAA
          0cWCh39E3LopWvm1qCvQczGXPkE+c62uwErnmHOhYdrSdUkTbg8Wr6WPXdI3gq6Q/hdxAc7yu9WpcS5so
          PVT4MDJrcKJO3/EWu2MxzHecUgc0Q1DAAO+hfd9oXEHnnC9kRFwmcBD3z34dJQykTSle3ged8KKUbHBHY
          8f/S+kw1t83THIRIiaU4cTD4J3SL4H2ZG6Q0ei8rGJfTK4t9YNSiqY4vJJkaSzeucL6e4ZVaiNZbo05Ey
          TJrsxnVNyRpu4BpsPFE/dM6u4apwbVODfbXwSgcB6QTd76tlchFjkPps6CyoXWEFoHB5wljKIvNg0Uy0G
          1YYODoUhQZpRGV4FpyNG8F2i9VrBuQ2db8E2gU3wCB2q4WMnaVCXjuILylATOmKWTmERTCQL2Re6oKsTT
          Cbj6duwQMcpeHsDyQkTpG+HyugT9G8QteUWVMOEOaiCYjLh8GNBrUiApqZJwZclnbcqmA7of7BViymjJc
          QRFslMzMJvI3pR5YPCYFRRGbNPc1FUKafEAAWTVo1mmitCVOyo5g6U9RPwJDUSPvawhKJRIJp4/HzwYWoI
          K3MUJx6Lq2Ddn1RqC1TQCB4JKyhHbmPgy0K2DI3J40Ju86xxPBRA7fl/0As6cFPs/P+5uo29QroEzRVI
          JkVXcJL81gG1r3fQFs3yZmV7+0dVoZGYQWKaQtF9YTf/TaXc34ifqzQs+7BH45Y6K65g6MSVMrO/ONg5
          qyn1FV3DOGBEgsl32L+YmhzDk9IHbTA5pV38HzuTw7qVqaAXWAn5KXdH3E/0uHcGegM0wFK2lkZbr/1EcS
          eTrjp5Fst4ZYbGPV5T4VYmb33Vw1nBohDWbi2wXnVxOcNse9Lu8Wo1EDZUYuB3OIxWi6x3ozomw147nYxUx
          N499paTQxIr3XQ3RXEopiZ0/WBs32qT68E+4GSAtreWswI4Crd7bDpL4Ky0NSGJOp7w7tJxEsNJdZx1PpN6
          b1zh6N7Vrqj7W4aXAp6A23j0VT2vZjPag8dqz2EIpvruN4e3LQlY2sReIThoCZ7GBvxDkMKkxB9XPYUqEGzp
          2OXqyEOmC7bct/X+DJ0O2XHbbnfiNyGiAQtXcyA2i2gKdDMXvUxHcXUC6KR2dbmpsfPcAWb2bqSmS9kDehNz
          L9NmEnlzqmVq0iT6PY29W0yFbKDjw16v4mItDLNFLp9EU+SLyI9mA5Jld5B/I3f51zgfdGfRSD1tDHvZNu2f
          8vluNxqNdrt5fuqn26znxeD7D1QqmVld5FPRAAAAAElFTkSuQmCC" alt="Close" />
        </h2>


        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items flex">
              {items.map((obj) => (
                <div key={obj.id} className="cartItem d-flex align-center mb-20">
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"></div>

                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} сом.</b>
                  </div>
                  <button onClick={() => onRemove(obj.id)}>Delete</button>
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} сом. </b>
                </li>
                <li>
                  <span>Налог Жапарову 5%:</span>
                  <div></div>
                  <b>{(totalPrice / 100) * 5} сом. </b>
                </li>
              </ul>
              <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                Оформить заказ
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
            description={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
            }
            image={isOrderComplete ? 'img/complete-order.jpg' : 'img/empty-cart.jpg'}
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
